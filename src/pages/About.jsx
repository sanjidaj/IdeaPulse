import { FaBullseye, FaHandsHelping, FaRocket } from "react-icons/fa";

const About = () => {
  const pillars = [
    {
      icon: <FaBullseye />,
      title: "Validate",
      description: "Test your idea against real feedback before you build.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Collaborate",
      description: "Learn from entrepreneurs, developers and fellow innovators.",
    },
    {
      icon: <FaRocket />,
      title: "Grow",
      description: "Refine your concept into a stronger, more confident venture.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931] text-white py-16 px-6">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#B3CFE5] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-3">
            Our Story
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            About IdeaPulse
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 lg:p-12 border border-[#4A7FA7]/60 rounded-3xl shadow-lg shadow-black/10">

          <div className="space-y-6">
            <p className="text-base sm:text-lg leading-8 text-[#DCE8F2]">
              IdeaPulse is a startup idea validation platform where entrepreneurs, students and innovators can share their ideas and receive valuable feedback before investing time and resources into development.
            </p>

            <p className="text-base sm:text-lg leading-8 text-[#DCE8F2]">
              The platform encourages collaboration by allowing users to publish startup concepts, gather opinions and discover innovative ideas from the community. Through constructive discussions and community engagement, users can identify the strengths and weaknesses of their ideas, refine their concepts and make informed decisions before moving forward.
            </p>

            <p className="text-base sm:text-lg leading-8 text-[#DCE8F2]">
              Whether you're launching your first startup or exploring your next big innovation, IdeaPulse provides a supportive space to validate ideas, learn from others and transform creative concepts into stronger, more successful ventures.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 pt-10 mt-10 border-t border-white/10">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group text-center sm:text-left"
              >
                <div className="w-11 h-11 mx-auto sm:mx-0 rounded-xl bg-linear-to-br from-[#4A7FA7] to-[#1A3D63] flex items-center justify-center text-white text-lg shadow-md shadow-black/20 group-hover:scale-105 transition-transform duration-300">
                  {pillar.icon}
                </div>

                <h3 className="text-white font-semibold mt-3">
                  {pillar.title}
                </h3>

                <p className="text-[#B3CFE5] text-sm mt-1 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default About;