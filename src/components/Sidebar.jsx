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
import { useState } from "react";


const Sidebar = () => {
    const [open, setOpen] = useState(true);
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
            className={`h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col sticky top-0 transition-all duration-300 ${open ? "w-64" : "w-20"
                }`}
        >

            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">

                {open ? (
                    <>
                        <img
                            src={logoImg}
                            alt="IdeaPulse"
                            className="h-12"
                        />

                        <button
                            onClick={() => setOpen(false)}
                            className="text-[#1A3D63] hover:text-[#4A7FA7] hover:bg-[#F5F9FD] transition-colors duration-200 p-2 rounded-lg"
                        >
                            <RxCross2 className="text-lg" />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="mx-auto text-2xl text-[#1A3D63] hover:text-[#4A7FA7] hover:bg-[#F5F9FD] transition-colors duration-200 p-2 rounded-lg"
                    >
                        <HiBars3 />
                    </button>
                )}

            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            title={!open ? item.name : undefined}
                            className={`group relative flex items-center ${open ? "gap-3.5 px-4 justify-start" : "justify-center"
                                } py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-[#1A3D63] text-white font-semibold shadow-sm"
                                    : "text-gray-600 hover:bg-[#F5F9FD] hover:text-[#1A3D63]"
                                }`}
                        >
                            {isActive && open && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full " />
                            )}

                            <span
                                className={`text-xl transition-transform duration-200 ${!isActive && "group-hover:scale-110"
                                    }`}
                            >
                                {item.icon}
                            </span>

                            {open && (
                                <span className="text-[15px] tracking-tight">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;