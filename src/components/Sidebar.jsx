import {
    FaHome,
    FaLightbulb,
    FaPlusCircle,
    FaHeart,
    FaChartBar,
    FaCompass,

} from "react-icons/fa";

import { Link, useLocation } from "react-router";
import logoImg from "../assets/logo.png";
import { RxCross2 } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";


const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();

    const menuItems = [
        {
            name: "Home",
            path: "/homepage",
            icon: <FaHome />,
        },
        {
            name: "My Ideas",
            path: "/my-ideas",
            icon: <FaLightbulb />,
        },
        {
            name: "Explore Ideas",
            path: "/explore",
            icon: <FaCompass />,
        },
        {
            name: "Submit Idea",
            path: "/submit-idea",
            icon: <FaPlusCircle />,
        },
        {
            name: "Saved Ideas",
            path: "/saved-ideas",
            icon: <FaHeart />,
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartBar />,
        },
    ];

    return (
        <aside
            className={`h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 transition-all duration-300 ${open ? "w-64" : "w-20"
                }`}
        >
          
            {/* Header */}
            <div className="flex items-center justify-between p-2">

                {open ? (
                    <>
                        <img
                            src={logoImg}
                            alt="IdeaPulse"
                            className="h-14"
                        />

                        <button
                            onClick={() => setOpen(false)}
                            className=" text-[#1A3D63] hover:text-[#4A7FA7] transition px-4"
                        >
                            <RxCross2 />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="mx-auto text-2xl text-[#1A3D63] hover:text-[#4A7FA7] transition"
                    >
                       <HiBars3/>
                    </button>
                )}

            </div>

            {/* Menu */}
            <nav className="flex-1 px-2 py-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center ${open ? "gap-4 px-4 justify-start" : "justify-center"
                            } py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                                ? "bg-[#EAF3FB] text-[#1A3D63] font-semibold"
                                : "text-gray-700 hover:bg-[#F5F9FD]"
                            }`}
                    >
                        <span className="text-2xl">{item.icon}</span>

                        {open && (
                            <span className="text-lg">
                                {item.name}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;