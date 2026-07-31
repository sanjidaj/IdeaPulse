
const About = () => {


  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931] text-white py-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#B3CFE5] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-3">
            Our Story
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            About IdeaPulse
          </h1>
        </div>

       <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">

          {/* Top Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#1A3D63]"></div>

          <div className="p-8 md:p-12 lg:p-14 space-y-8">

            <p className="text-lg leading-9 text-[#DCE8F2]">
              IdeaPulse is a startup idea validation platform where
              entrepreneurs, students and innovators can share their ideas and
              receive valuable feedback before investing time and resources into
              development.
            </p>

            <p className="text-lg leading-9 text-[#DCE8F2]">
              The platform encourages collaboration by allowing users to publish
              startup concepts, gather opinions and discover innovative ideas
              from the community. Through constructive discussions and community
              engagement, users can identify the strengths and weaknesses of
              their ideas, refine their concepts and make informed decisions
              before moving forward.
            </p>

            <p className="text-lg leading-9 text-[#DCE8F2]">
              Whether you're launching your first startup or exploring your next
              big innovation, IdeaPulse provides a supportive space to validate
              ideas, learn from others and transform creative concepts into
              stronger, more successful ventures.
            </p>

          </div>

          {/* Decorative Background */}
          <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-[#4A7FA7]/5 blur-2xl"></div>

        </div>

      </div>

      </div>

  );
};

export default About;