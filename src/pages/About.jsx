const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931]  text-white py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-6">
          About IdeaPulse
        </h1>

        <div className=" p-10 space-y-6">

          <p className="text-lg leading-8 text-white">
            IdeaPulse is a startup idea validation platform where entrepreneurs,
            students, and innovators can share their ideas and receive valuable
            feedback before investing time and resources into development.
          </p>

          <p className="text-lg leading-8 text-white">
            The platform encourages collaboration by allowing users to publish
            startup concepts, gather opinions, and discover innovative ideas
            from the community.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-6">

            {/* <div className="text-center">
              <h2 className="text-4xl font-extrabold text-[#0A1931]">100+</h2>
              <p className="text-gray-300">Ideas Shared</p>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-[#0A1931]">500+</h2>
              <p className="text-gray-300">Community Feedback</p>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-[#0A1931]">50+</h2>
              <p className="text-gray-300">Active Members</p>
            </div> */}

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;