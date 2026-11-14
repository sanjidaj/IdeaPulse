/* eslint-disable no-unused-vars */

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get access token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token required.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      // eslint-disable-next-line no-undef
      process.env.ACCESS_TOKEN_SECRET
    );

    // Store authenticated user information
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token.",
    });
  }
  
};
