import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import heroImg from "../../assets/hero-bg.jpg"


const Hero = () => {
    return (
        <section
        className="h-screen  bg-cover bg-center bg-no-repeat " style={{
                backgroundImage: `url(${heroImg})`,
              }}>
            <div className="max-w-6xl  mx-auto  py-10  flex items-center justify-center h-screen">

                <div className="grid grid-cols-2 text-center  items-center  w-full">


                    <div>

                        <h1 className="text-5xl  font-extrabold  text-white">
                            Validate your startup<br/>idea before you build it.
                        </h1>

                        <p className=" text-[#738da1] mt-8 ">
                            Share your startup idea, gather meaningful feedback<br/>and validate demand before development.
                        </p>

                        <div className="flex justify-center flex-wrap gap-5 mt-10">

                            <Link to="/login">

                                <button className="bg-linear-to-r from-[#1A3D63] to-[#4A7FA7]  hover:from-[#1A3D63] hover:to-[#1A3D63] transition-all duration-300 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2">

                                    Submit your idea

                                    <FaArrowRight />

                                </button>
                            </Link>

                            <div className="group p-[1.5px] rounded-xl bg-linear-to-r from-[#4A7FA7] to-[#1A3D63]">
                                <Link to="/login">
                                    <button className="bg-[#0A1931] group-hover:bg-transparent text-white px-4 py-3 rounded-[11px] font-semibold transition-all duration-300">
                                        Explore ideas
                                    </button>

                                </Link>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </section>
    );
};

export default Hero;