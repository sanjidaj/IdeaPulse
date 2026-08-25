import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="relative bg-[#0A1931] py-10 px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4A7FA7]/20 blur-3xl" />
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#1A3D63]/40 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#4A7FA7]/20 blur-3xl" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#4A7FA7 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#4A7FA7] mb-6">
          Ready When You Are
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
          Stop guessing.
          <br />
          Start validating.
        </h2>

        <p className="text-[#738da1] text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          Your next big idea deserves real feedback, not silence. Submit it
          today and see if it holds up before you spend a single hour building.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">
          <Link to="/submit-idea">
            <button className="bg-linear-to-r from-[#1A3D63] to-[#4A7FA7] hover:from-[#1A3D63] hover:to-[#1A3D63] transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-0.5 text-lg">
              Submit your idea
              <FaArrowRight />
            </button>
          </Link>

          <div className="group p-[1.5px] rounded-xl bg-linear-to-r from-[#4A7FA7] to-[#1A3D63] hover:-translate-y-0.5 transition-transform duration-300">
            <Link to="/explore">
              <button className="bg-[#0A1931] group-hover:bg-transparent text-white px-8 py-4 rounded-[11px] font-semibold transition-all duration-300 text-lg">
                Explore ideas
              </button>
            </Link>
          </div>
        </div>

        <p className="text-[#738da1]/70 text-sm mt-8">
          No credit card required. Free to get started.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;