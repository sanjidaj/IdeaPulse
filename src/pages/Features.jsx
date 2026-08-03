import { FaChartLine, FaComments, FaCompass, FaLightbulb, FaShieldAlt, FaUserCircle } from "react-icons/fa";

const Features = () => {


const features = [
  {
    icon: <FaLightbulb/>,
    title: "Share Startup Ideas",
    description: "Publish your startup ideas and introduce your vision to the community.",
  },
  {
    icon: <FaComments/>,
    title: "Community Feedback",
    description: "Receive valuable comments and suggestions from entrepreneurs and developers.",
  },
  {
    icon: <FaChartLine/>,
    title: "Idea Validation",
    description: "Measure public interest through likes and feedback before building.",
  },
  {
    icon: <FaCompass/>,
    title: "Discover Ideas",
    description: "Explore innovative startup ideas shared by other users.",
  },
  {
    icon: <FaUserCircle/>,
    title: "User Profiles",
    description: "Create a profile to manage your published ideas and activity.",
  },
  {
    icon: <FaShieldAlt/>,
    title: "Secure Platform",
    description: "Safe and secure authentication for users and administrators.",
  },
];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1F33] via-[#132C47] to-[#1A3D63] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#B3CFE5] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-3">
            Why IdeaPulse
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Features
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            Explore the core features designed to turn innovative ideas into successful ventures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#6FA3C8]/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Accent glow on hover */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#4A7FA7]/0 group-hover:bg-[#4A7FA7]/20 blur-2xl transition-all duration-500" />

              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-[#4A7FA7] to-[#1A3D63] flex items-center justify-center text-white text-xl shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300">
                  {feature.icon}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white mb-1.5 tracking-tight">
                    {feature.title}
                  </h2>

                  <p className="text-[#B3CFE5] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;