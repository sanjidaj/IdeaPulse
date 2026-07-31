import { FaCode } from "react-icons/fa";
import { LuSprout, LuUserRound } from "react-icons/lu";

const UseCases = () => {
  const cases = [
    {
      icon: <LuUserRound />,
      title: "Solo Founders",
      description:
        "Building your startup alone? Share your ideas, gather honest feedback from potential users, and validate your startup before investing significant time and effort",
    },
    {
      icon: <LuSprout />,
      title: "First-time Founders",
      description:
        "Not sure if your idea holds up? Get structured feedback from real people before you pitch investors or quit your job.",
    },
    {
      icon: <FaCode />,
      title: "Side-project Builders",
      description:
        "Got a dozen ideas and limited weekends? Validate which one deserves your time before you write a single line of code.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A1931] py-10 px-6 lg:px-8">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4A7FA7]/20 blur-3xl" />
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#1A3D63]/40 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#4A7FA7]/20 blur-3xl" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#4A7FA7 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#4A7FA7] mb-4">
            Who It's For
          </span>

          <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            Built for builders who validate before they build
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#4A7FA7]/50 hover:shadow-[0_0_30px_rgba(74,127,167,0.25)]"
            >
              {/* Top Accent */}
              <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-[#4A7FA7] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4A7FA7]/15 text-2xl text-[#4A7FA7] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#4A7FA7] group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="text-[#B8C4CE] leading-8">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;