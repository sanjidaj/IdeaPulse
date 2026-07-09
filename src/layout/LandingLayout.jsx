
import { Outlet } from "react-router";
import LandingNavbar from "../components/landingPage/LandingNavbar";
import Footer from "../components/shared/Footer";
// import heroBg from "../assets/hero.jpg"
import heroImg from "../assets/hero-bg.jpg"

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar/>
     
      {/* <main className="bg-linear-to-br from-[#F6FAFD] via-[#B3CFE5] to-[#4A7FA7]"> */}
      <main className="h-screen  bg-cover bg-center bg-no-repeat " style={{
        backgroundImage: `url(${heroImg})`,
      }}>
        <div className="max-w-6xl  mx-auto  py-10 "  >
          <Outlet/>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default LandingLayout;