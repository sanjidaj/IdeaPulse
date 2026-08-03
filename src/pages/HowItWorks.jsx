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
    <div className="min-h-screen bg-linear-to-br from-[#0B1F33] via-[#132C47] to-[#1A3D63] text-white py-16 px-6">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#B3CFE5] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-3">
            The Process
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How It Works
          </h1>

          <p className="text-gray-300 mt-2 text-base sm:text-lg">
            Validate your startup idea in four simple steps.
          </p>
        </div>

        <div className="relative">

          {/* Connecting line */}
          <div className="hidden sm:block absolute left-9.5 top-4 bottom-4 w-px bg-white/15" />

          <div className="space-y-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col sm:flex-row gap-5 sm:gap-7 bg-white border border-[#B3CFE5]/60 rounded-2xl p-6 sm:p-7 shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#0A1931] text-white text-xl font-bold group-hover:bg-[#1A3D63] transition-colors duration-300">
                  {step.number}
                </span>

                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-1.5 text-[#0A1931] tracking-tight">
                    {step.title}
                  </h2>

                  <p className="text-[#1A3D63]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default HowItWorks;