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
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931] text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
       

        <h1 className="text-4xl font-bold text-center mb-4">
          Features
        </h1>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Explore the core features designed to turn innovative ideas into successful ventures.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-[#4A7FA7] via-[#4A7FA7] to-[#1A3D63] border border-[#B3CFE5] shadow rounded-xl p-6 hover:-translate-y-2 transition space-y-2 "
            >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#0A1931] flex items-center justify-center  text-[#6FA3C8] text-3xl">
               {feature.icon}
             </div>
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                {feature.title}
              </h2>

              <p className="text-white text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;