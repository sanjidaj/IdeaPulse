const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Register and log in to access all IdeaPulse features.",
    },
    {
      number: "02",
      title: "Publish Your Idea",
      description:
        "Describe your startup idea with a clear title and explanation.",
    },
    {
      number: "03",
      title: "Receive Feedback",
      description:
        "Community members can like and comment on your idea.",
    },
    {
      number: "04",
      title: "Improve & Build",
      description:
        "Use the feedback to refine your idea before development.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A3D63] to-[#0A1931] bg- text-white py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-4">
          How It Works
        </h1>

        <p className="text-center text-gray-300 mb-10">
          Validate your startup idea in four simple steps.
        </p>

        <div className="grid md:grid-cols-1 gap-4">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#B3CFE5] rounded-xl p-4"
            >
              <span className="text-xl font-semibold bg-[#0A1931] px-3 py-2 rounded-full">
                {step.number}
              </span>

              <h2 className="text-2xl font-semibold mt-4 mb-3 text-[#0A1931]">
                {step.title}
              </h2>

              <p className="text-[#1A3D63] leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default HowItWorks;