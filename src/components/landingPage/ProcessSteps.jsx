import { FaPaperPlane, FaComments, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaPaperPlane />,
    number: "01",
    title: "Submit",
    description:
      "Share your startup idea in a few minutes. Add context, your target audience, and what problem it solves.",
  },
  {
    icon: <FaComments />,
    number: "02",
    title: "Get Feedback",
    description:
      "Real people vote and leave structured feedback. Watch demand signals build up in real time.",
  },
  {
    icon: <FaCheckCircle />,
    number: "03",
    title: "Decide",
    description:
      "Use the signal and feedback to confidently move forward, pivot, or drop the idea before you build anything.",
  },
];

const ProcessSteps = () => {
  return (
    <section className="bg-[#0A1931] py-10 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#4A7FA7] mb-4">
            Validation Process
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Three steps from idea to answer
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-13 left-[16.6%] right-[16.6%] h-0.5 bg-linear-to-r from-[#4A7FA7]/40 via-[#4A7FA7]/20 to-[#4A7FA7]/40" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="relative z-10 w-26 h-26 rounded-full bg-[#0A1931] border border-[#4A7FA7]/30 flex items-center justify-center mb-8 transition-all duration-300 group-hover:border-[#4A7FA7] group-hover:shadow-[0_0_30px_rgba(74,127,167,0.35)]">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#4A7FA7]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {step.icon}
                </div>

                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#4A7FA7]/15 border border-[#4A7FA7]/30 flex items-center justify-center text-[#4A7FA7] text-xs font-bold transition-all duration-300 group-hover:bg-[#4A7FA7] group-hover:text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl mb-3 transition-colors duration-300 group-hover:text-[#7DB2D8]">
                {step.title}
              </h3>

              <p className="text-[#738da1] leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-[#BFD3E3]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;