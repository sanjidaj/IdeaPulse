import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const RootLayout = () => {
    return (
    <div className="">
      <Navbar/>
      <main className="bg-linear-to-br from-[#B3CFE5] via-[#4A7FA7] to-[#1A3D63]">
        <div className="mx-auto min-h-screen">
            <Outlet/>
        </div>
      </main>
      <Footer/>
    </div>
    );
};

export default RootLayout;