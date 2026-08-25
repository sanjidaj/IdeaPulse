import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F5F7FA]">

            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            {/* Page Content */}
            <main
                className={`
                    min-h-screen
                    pt-16
                    transition-[margin]
                    duration-300
                    ease-in-out

                    ${
                        sidebarOpen
                            ? "ml-72"
                            : "ml-20"
                    }

                    max-md:ml-16
                `}
            >
                <div className="w-full min-h-screen min-w-0">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default RootLayout;