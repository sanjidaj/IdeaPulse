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
            className={`h-screen bg-[#0F2A47] flex flex-col sticky top-0 transition-[width] duration-300 ease-in-out ${open ? "w-72" : "w-20"
                }`}
        >
            {/* ambient glow accent, signature element */}
            <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#4FA3E3]/10 blur-3xl" />

            {/* Header */}
            <div
                className={`fixed relative flex items-center border-b border-white/10 ${open ? "justify-end px-5 py-3" : "justify-center py-3"
                    }`}
            >
                {open ? (
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Collapse sidebar"
                        className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-150"
                    >
                        <RxCross2 className="text-lg" />
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Expand sidebar"
                        className="text-xl text-white/70 hover:text-white hover:bg-white/10 p-2.5 rounded-lg transition-colors duration-150"
                    >
                        <HiBars3 />
                    </button>
                )}
            </div>

            {/* Menu */}
            <nav className="relative flex-1 px-3 pt-3 space-y-1 overflow-y-auto overflow-x-hidden">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            title={!open ? item.name : undefined}
                            className={`group relative flex items-center ${open ? "gap-3 px-3.5 justify-start" : "justify-center"
                                } py-3 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FA3E3]/70 ${isActive
                                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                                    : "text-white/80 hover:bg-white/5 hover:text-white/90"
                                }`}
                        >
                            <span
                                className={`text-lg transition-transform duration-200 ${isActive ? "text-[#4FA3E3]" : "group-hover:scale-110 group-hover:text-[#4FA3E3]/80"
                                    }`}
                            >
                                {item.icon}
                            </span>

                            {open && (
                                <span
                                    className={`text-[14px] tracking-tight transition-colors duration-200 ${isActive ? "font-semibold text-[#4FA3E3]" : "font-medium group-hover:text-[#4FA3E3]/80 group-hover:scale-110 "
                                        }`}
                                >
                                    {item.name}
                                </span>
                            )}

                            {/* tooltip when collapsed */}
                            {!open && (
                                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#0F2A47] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100  z-50">
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