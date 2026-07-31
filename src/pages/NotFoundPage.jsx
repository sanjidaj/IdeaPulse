import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d405a]/10 px-6">
      <div className="relative text-center max-w-md w-full">
           

        <h1 className="text-8xl font-bold tracking-tight text-[#1d405a] leading-none">
          404
        </h1>

        <div className="mt-4 mb-2 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#1d405a]/30" />
          <p className="text-lg font-serif font-bold text-[#1d405a]">
            Page Not Found
          </p>
          <span className="h-px w-8 bg-[#1d405a]/30" />
        </div>

        <p className="text-[#1d405a]/70 mb-8">
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <button className="inline-flex items-center gap-2 rounded-md bg-[#0A1931] px-6 py-3 text-white font-medium tracking-wide transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;