import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#0A1931] overflow-x-hidden">
      <div className="max-w-6xl mx-auto min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 px-5 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-0">
        {/* Left: content, left-aligned */}
        <div className="text-left order-2 lg:order-1">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#4A7FA7] mb-4 sm:mb-6">
            Idea Validation Platform
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.15] sm:leading-[1.1] tracking-tight">
            Validate your startup
            <br className="hidden sm:block" />
            idea before you build it.
          </h1>

          <p className="text-[#738da1] text-base sm:text-lg mt-5 sm:mt-6 max-w-md leading-relaxed">
            Share your startup idea, gather meaningful feedback and validate
            demand before development.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-5 mt-8 sm:mt-10">
            <Link to="/submit-idea" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#1A3D63] to-[#4A7FA7] hover:from-[#1A3D63] hover:to-[#1A3D63] transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-0.5">
                Submit your idea
                <FaArrowRight />
              </button>
            </Link>

            <div className="w-full sm:w-auto group p-[1.5px] rounded-xl bg-gradient-to-r from-[#4A7FA7] to-[#1A3D63] hover:-translate-y-0.5 transition-transform duration-300">
              <Link to="/explore" className="block">
                <button className="w-full sm:w-auto bg-[#0A1931] group-hover:bg-transparent text-white px-6 py-3 rounded-[11px] font-semibold transition-all duration-300">
                  Explore ideas
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: generated illustration instead of a photo */}
        <div className="relative order-1 lg:order-2 h-[32vh] sm:h-[42vh] lg:h-[70vh] w-full">
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#4A7FA7]/20 bg-[#0A1931]">
            {/* dot grid texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#4A7FA7 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* soft glow blobs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#4A7FA7]/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#1A3D63]/50 blur-3xl" />

            {/* centerpiece: an upward validation-signal chart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 300 220"
                className="w-[80%] h-[80%]"
                fill="none"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1A3D63" />
                    <stop offset="100%" stopColor="#4A7FA7" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A7FA7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#4A7FA7" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* baseline grid */}
                <line x1="0" y1="190" x2="300" y2="190" stroke="#4A7FA7" strokeOpacity="0.2" />
                <line x1="0" y1="140" x2="300" y2="140" stroke="#4A7FA7" strokeOpacity="0.12" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="#4A7FA7" strokeOpacity="0.12" />

                {/* area under the trend line */}
                <path
                  d="M10,170 C60,175 90,150 130,130 C170,110 200,60 290,20 L290,190 L10,190 Z"
                  fill="url(#areaGrad)"
                />

                {/* trend line */}
                <path
                  d="M10,170 C60,175 90,150 130,130 C170,110 200,60 290,20"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* data nodes */}
                <circle cx="10" cy="170" r="4" fill="#738da1" />
                <circle cx="130" cy="130" r="4" fill="#738da1" />
                <circle cx="210" cy="70" r="4" fill="#738da1" />

                {/* pulsing signal node at the peak */}
                <circle cx="290" cy="20" r="14" fill="#4A7FA7" fillOpacity="0.25">
                  <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="290" cy="20" r="6" fill="#ffffff" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;