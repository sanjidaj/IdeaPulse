
import { Outlet } from "react-router";
import LandingNavbar from "../components/landingPage/LandingNavbar";
import Footer from "../components/shared/Footer";
// import heroImg from "../assets/hero-bg.jpg"

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar/>
      
     
      <main className="bg-linear-to-br from-[#B3CFE5] via-[#4A7FA7] to-[#1A3D63]">
        <div className=" "  >
          <Outlet/>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default LandingLayout;