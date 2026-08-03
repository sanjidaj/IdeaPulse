import { Link, useNavigate } from "react-router";
import logoImg from "../../assets/logo.png";
import LogoText from "../../assets/logoText.png";
import {
  FaCog,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto flex h-15 items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={logoImg}
            alt="Logo"
            className="h-11 w-auto"
          />

          <img
            src={LogoText}
            alt="Logo Text"
            className="h-7 w-auto"
          />
        </Link>

        {/* Navigation */}
        <ul className="hidden lg:flex items-center gap-10">

          <li>
            <Link
              to="/features"
              className="relative text-sm font-medium text-[#1A3D63] transition-all duration-300 hover:text-[#4A7FA7]
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-[#4A7FA7]
              after:transition-all after:duration-300
              hover:after:w-full"
            >
              Features
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="relative text-sm font-medium text-[#1A3D63] transition-all duration-300 hover:text-[#4A7FA7]
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-[#4A7FA7]
              after:transition-all after:duration-300
              hover:after:w-full"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/how-it-works"
              className="relative text-sm font-medium text-[#1A3D63] transition-all duration-300 hover:text-[#4A7FA7]
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-[#4A7FA7]
              after:transition-all after:duration-300
              hover:after:w-full"
            >
              How It Works
            </Link>
          </li>

        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {user ? (
            <>
              {/* Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A7FA7]" />

                  <input
                    type="text"
                    placeholder="Search ideas..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-72 rounded-full border border-gray-200 bg-[#F8FBFD]
                    pl-11 pr-5 py-2.5 text-sm
                    outline-none transition-all duration-300
                  focus:border-[#4A7FA7]
                    focus:ring-4 focus:ring-[#4A7FA7]/20"
                  />
                </div>
              </form>
              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="cursor-pointer"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] text-lg font-bold text-white ring-2 ring-[#4A7FA7]/20 transition-all duration-300 hover:scale-105 hover:ring-[#4A7FA7]/50">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="dropdown-content mt-4 w-80 rounded-3xl border border-gray-100 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-100"
                >
                  {/* Profile Header */}
                  <div className="rounded-2xl bg-linear-to-br from-[#EEF6FC] to-white p-6">
                    <div className="flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] text-4xl font-bold text-white shadow-lg shadow-[#4A7FA7]/20">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <h2 className="mt-4 text-center text-2xl font-bold text-[#1A3D63]">
                      {user?.name}
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="my-3 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Menu */}
                  <ul className="menu w-full rounded-2xl bg-white p-2">

                    <li className="rounded-xl transition-all duration-300 hover:bg-[#EEF6FC]">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-xl"
                      >
                        <FaUserCircle />
                        Profile
                      </Link>
                    </li>

                    <li className="rounded-xl transition-all duration-300 hover:bg-[#EEF6FC]">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-xl"
                      >
                        <FaCog />
                        Settings
                      </Link>
                    </li>

                    <li className="rounded-xl transition-all duration-300 hover:bg-red-50">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-xl text-red-600"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </li>

                  </ul>
                </div>
              </div>

            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="rounded-xl border border-[#4A7FA7] px-5 py-2.5 font-medium text-[#1A3D63] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EEF6FC]"
              >
                Login
              </Link>

              {/* Get Started */}
              <Link
                to="/register"
                className="rounded-xl bg-linear-to-r from-[#1A3D63] to-[#4A7FA7] px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#4A7FA7]/30"
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