import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  
  return (
    <div>
      <Navbar />

      {/* Sidebar + Page Content */}
      <div className="flex min-h-screen bg-[#F5F7FA]">

        <Sidebar />
        {/* bg-linear-to-br from-[#B3CFE5] via-[#4A7FA7] to-[#1A3D63] */}
        <main className="flex-1">
          <div className="mx-auto min-h-screen">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};

export default RootLayout;