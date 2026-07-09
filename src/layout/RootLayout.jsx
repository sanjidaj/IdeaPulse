import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const RootLayout = () => {
    return (
    <div className="">
      <Navbar/>
      <main className="bg-linear-to-br from-[#F6FAFD] via-[#B3CFE5] to-[#4A7FA7]">
        <div className="max-w-4xl  mx-auto min-h-screen">
            <Outlet/>
        </div>
      </main>
      <Footer/>
    </div>
    );
};

export default RootLayout;