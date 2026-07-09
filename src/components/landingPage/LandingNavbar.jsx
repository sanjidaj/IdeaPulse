import { Link } from "react-router";
import logoImg from "../../assets/logo.png"
import LogoText from "../../assets/logoText.png"
const LandingNavbar = () => {
  return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo image */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg} 
            alt="Logo"
            className="h-10"
          />
          {/* Logo Text*/}
          <img
            src={LogoText} 
            alt="LogoText"
            className="h-7"
          />
          
        </Link>

        {/* navigation link */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline">
              Features
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline">
              About
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-[#4A7FA7] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#0A1931] text-white px-5 py-2 rounded-full font-medium hover:bg-[#4A7FA7] transition shadow-md"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default LandingNavbar;