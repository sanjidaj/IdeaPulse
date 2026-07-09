
import { Outlet } from "react-router";
import LandingNavbar from "../components/landingPage/LandingNavbar";
import Footer from "../components/shared/Footer";

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar/>
      <main className="bg-linear-to-br from-[#F6FAFD] via-[#B3CFE5] to-[#4A7FA7]">
        <div className="max-w-4xl  mx-auto min-h-screen">
          <Outlet/>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default LandingLayout;