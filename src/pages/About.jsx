const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931]  text-white py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-6">
          About IdeaPulse
        </h1>

        <div className=" p-10 space-y-6 border-2 border-[#4A7FA7] rounded-3xl">

          <p className="text-lg leading-8 text-white">
            IdeaPulse is a startup idea validation platform where entrepreneurs, students and innovators can share their ideas and receive valuable feedback before investing time and resources into development.
          </p>

          <p className="text-lg leading-8 text-white">
            The platform encourages collaboration by allowing users to publish startup concepts, gather opinions and discover innovative ideas from the community. Through constructive discussions and community engagement, users can identify the strengths and weaknesses of their ideas, refine their concepts and make informed decisions before moving forward.
          </p>
          <p className="text-lg leading-8 text-white">
            Whether you're launching your first startup or exploring your next big innovation, IdeaPulse provides a supportive space to validate ideas, learn from others and transform creative concepts into stronger, more successful ventures.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-6">

           

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;