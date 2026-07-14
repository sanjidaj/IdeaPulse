
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
// import heroImg from "../assets/hero-bg.jpg"

const LandingLayout = () => {
  return (
    <>
      <Navbar/>
      
     
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