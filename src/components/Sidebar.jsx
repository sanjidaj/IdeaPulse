import {
    FaHome,
    FaLightbulb,
    FaPlusCircle,
    FaHeart,
    FaChartBar,
    FaCompass,
} from "react-icons/fa";

import { Link, useLocation } from "react-router";
import { RxCross2 } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
// import { useState } from "react";

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
        <aside className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-[#0F2A47] flex flex-col shrink-0 transition-[width] duration-300 ease-in-out ${open ? "w-72" : "w-20"} max-md:w-16`}>
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#4FA3E3]/10 blur-3xl" />

            {/* Header */}
            <div className={`relative flex items-center border-b border-white/10 min-h-[60px] ${open ? "justify-end px-5" : "justify-center"} max-md:justify-center max-md:px-0`}>
                {/* Desktop collapse/expand */}
                <div className="max-md:hidden">
                    {open ? (
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Collapse sidebar"
                            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                        >
                            <RxCross2 className="text-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Expand sidebar"
                            className="text-xl text-white/70 hover:text-white hover:bg-white/10 p-2.5 rounded-lg transition-colors"
                        >
                            <HiBars3 />
                        </button>
                    )}
                </div>
            </div>

            {/* Menu */}
            <nav className="relative flex-1 px-3 pt-3 space-y-1 overflow-y-auto overflow-x-hidden max-md:px-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group relative flex items-center py-3 rounded-xl transition-all duration-200 ${open ? "gap-3 px-3.5 justify-start" : "justify-center"} max-md:justify-center max-md:px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FA3E3]/70 ${isActive ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" : "text-white/80 hover:bg-white/5 hover:text-white/90"}`}
                        >
                            {/* Icon */}
                            <span className={`text-lg shrink-0 transition-transform duration-200 ${isActive ? "text-[#4FA3E3]" : "group-hover:scale-110 group-hover:text-[#4FA3E3]/80"}`}>
                                {item.icon}
                            </span>

                            {/* Text */}
                            {open && (
                                <span className={`text-[14px] tracking-tight transition-colors duration-200 max-md:hidden ${isActive ? "font-semibold text-[#4FA3E3]" : "font-medium group-hover:text-[#4FA3E3]/80"}`}>
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