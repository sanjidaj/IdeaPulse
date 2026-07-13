
import { Outlet } from "react-router";
import LandingNavbar from "../components/landingPage/LandingNavbar";
import Footer from "../components/shared/Footer";
// import heroImg from "../assets/hero-bg.jpg"

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar/>
      
     
      <main className="">
        <div >
          <Outlet/>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default LandingLayout;