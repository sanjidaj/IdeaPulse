import { Link, useNavigate } from "react-router";
import logoImg from "../../assets/logo.png";
import LogoText from "../../assets/logoText.png";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="Logo"
            className="h-10"
          />

          <img
            src={LogoText}
            alt="Logo Text"
            className="h-7"
          />
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <li>
            <Link
              to="/features"
              className="text-xs text-[#1A3D63] hover:text-[#4A7FA7] hover:underline transition"
            >
              Features
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="text-xs text-[#1A3D63] hover:text-[#4A7FA7] hover:underline transition"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/how-it-works"
              className="text-xs text-[#1A3D63] hover:text-[#4A7FA7] hover:underline transition"
            >
              How It Works
            </Link>
          </li>

        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <Link to="/homepage" className=" text-[#1A3D63] hover:text-[#4A7FA7] transition flex justify-center items-center gap-2">
                  <FaHome/>Home
              </Link>
              

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-[#0A1931] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#4A7FA7] transition shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-[#4A7FA7] text-[#0A1931] hover:bg-[#EAF3FB] transition"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="bg-[#0A1931] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#4A7FA7] transition shadow-md"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;