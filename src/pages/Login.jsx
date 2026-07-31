import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import LogoText from "../assets/logoText.png";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
// import logoImg from "../assets/logo.png"

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/homepage");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      navigate("/homepage");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F33] via-[#132C47] to-[#1A3D63] p-4 relative overflow-hidden">
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px white inset;
          -webkit-text-fill-color: #1A3D63;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>
      {/* Ambient background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,127,167,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(26,61,99,0.4),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(74,127,167,0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/40 w-full max-w-md space-y-5"
      >
        <div className="flex justify-center">
          {/* <img src={logoImg} alt="Logo" className="h-12" /> */}
          <img src={LogoText} alt="Logo" className="h-10" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-[#1A3D63] text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-400 text-sm">Log in to continue to your account</p>
        </div>

        <div className="space-y-4">
          {/* Email field */}
          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
              focusedField === "email"
                ? "border-[#4A7FA7] ring-2 ring-[#4A7FA7]/20"
                : "border-[#4A7FA7]/20"
            }`}
          >
            <Mail
              size={18}
              className={focusedField === "email" ? "text-[#1A3D63]" : "text-[#4A7FA7]/60"}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent outline-none text-[#1A3D63] placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password field */}
          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
              focusedField === "password"
                ? "border-[#4A7FA7] ring-2 ring-[#4A7FA7]/20"
                : "border-[#4A7FA7]/20"
            }`}
          >
            <Lock
              size={18}
              className={focusedField === "password" ? "text-[#1A3D63]" : "text-[#4A7FA7]/60"}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent outline-none text-[#1A3D63] placeholder:text-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 hover:text-[#4A7FA7] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1A3D63]  hover:bg-[#4A7FA7] disabled:opacity-70 disabled:cursor-not-allowed transition-colors py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-[#4A7FA7]/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-gray-500 text-sm text-center">
          Don't have an account?
          <Link className="text-[#1A3D63] font-medium hover:underline" to="/register">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;