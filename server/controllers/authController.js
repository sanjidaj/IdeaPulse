/* eslint-disable no-undef */

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

// Cookie configuration
const COOKIE_NAME = "refreshToken";

const REFRESH_TOKEN_DAYS = Number(
  process.env.REFRESH_TOKEN_DAYS || 7
);

const cookieOptions = () => {
  const sameSite = process.env.COOKIE_SAME_SITE || "lax";

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite,
    path: "/",
    maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
  };
};

// Clear refresh token cookie
const clearRefreshCookie = (res) => {
  // eslint-disable-next-line no-unused-vars
  const { maxAge, ...options } = cookieOptions();
  res.clearCookie(COOKIE_NAME, options);
};

// Create access token
const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "10m",
    }
  );
};

// Generate random refresh token
const createRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Hash refresh token
const hashRefreshToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

// Create refresh token session
const createRefreshSession = async (user, family = crypto.randomUUID()) => {
  const refreshToken = createRefreshToken();

  const tokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    user: user._id,
    tokenHash,
    family,
    expiresAt,
  });

  return refreshToken;
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const accessToken = createAccessToken(user);

    const refreshToken = await createRefreshSession(user);

    res.cookie(
      COOKIE_NAME,
      refreshToken,
      cookieOptions()
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// REFRESH ACCESS TOKEN
export const refresh = async (req, res) => {
  try {
    const oldToken = req.cookies?.[COOKIE_NAME];

    if (!oldToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing.",
      });
    }

    const oldHash = hashRefreshToken(oldToken);

    const storedToken = await RefreshToken.findOne({
      tokenHash: oldHash,
    });

    if (!storedToken) {
      clearRefreshCookie(res);

      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }

    // Detect reuse of an already revoked token
    if (storedToken.revokedAt) {
      await RefreshToken.updateMany(
        {
          family: storedToken.family,
          revokedAt: null,
        },
        {
          $set: { revokedAt: new Date() },
        }
      );

      clearRefreshCookie(res);

      return res.status(401).json({
        success: false,
        message: "Refresh token reuse detected. Please log in again.",
      });
    }

    // Check expiration
    if (storedToken.expiresAt <= new Date()) {
      storedToken.revokedAt = new Date();
      await storedToken.save();

      clearRefreshCookie(res);

      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please log in again.",
      });
    }

    // Revoke old token
    const revokedToken = await RefreshToken.findOneAndUpdate(
      {
        _id: storedToken._id,
        revokedAt: null,
      },
      {
        $set: { revokedAt: new Date() },
      },
      {
        new: true,
      }
    );

    if (!revokedToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token already used.",
      });
    }

    const user = await User.findById(storedToken.user);

    if (!user) {
      clearRefreshCookie(res);

      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // Generate new refresh token in the same family
    const newRefreshToken = await createRefreshSession(
      user,
      storedToken.family
    );

    const newHash = hashRefreshToken(newRefreshToken);

    await RefreshToken.updateOne(
      { _id: storedToken._id },
      {
        $set: {
          replacedByTokenHash: newHash,
        },
      }
    );

    const accessToken = createAccessToken(user);

    res.cookie(
      COOKIE_NAME,
      newRefreshToken,
      cookieOptions()
    );

    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Refresh error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (token) {
      const tokenHash = hashRefreshToken(token);

      const storedToken = await RefreshToken.findOne({
        tokenHash,
      });

      if (storedToken) {
        await RefreshToken.updateMany(
          {
            family: storedToken.family,
            revokedAt: null,
          },
          {
            $set: { revokedAt: new Date() },
          }
        );
      }
    }

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
