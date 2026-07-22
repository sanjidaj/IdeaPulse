import { Link, useNavigate } from "react-router";
import logoImg from "../../assets/logo.png";
import LogoText from "../../assets/logoText.png";
import { FaCog, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

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

                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                <input
                                    type="text"
                                    placeholder="Search ideas..."
                                    className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7FA7] focus:border-[#4A7FA7]"
                                />
                            </div>

                            {/* User Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="avatar cursor-pointer"
                                >
                                    <div className="w-8 rounded-full bg-[#1A3D63] text-white flex items-center justify-center text-lg font-bold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="dropdown-content mt-3 w-80 bg-white rounded-xl shadow-2xl p-2 z-100"
                                >
                                    {/* Avatar */}
                                    <div className="bg-[#F6FAFD] p-4 rounded-2xl">
                                        <div className="flex justify-center">
                                            <div className="w-15 h-15 rounded-full bg-[#1A3D63]  text-white  flex items-center justify-center text-4xl font-bold">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h2 className="text-2xl font-bold text-center text-[#1A3D63] mt-2">
                                            {user?.name}
                                        </h2>

                                        {/* Email */}
                                        <p className="text-center text-gray-500 mt-2">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div className="divider"></div>

                                    {/* Menu */}
                                    <ul
                                        tabIndex={0}
                                        className=" menu bg-white w-full p-2 mt-1 z-100"
                                    >

                                        <li>
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <FaUserCircle />
                                                Profile
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <FaCog />
                                                Settings
                                            </Link>
                                        </li>

                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2"
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