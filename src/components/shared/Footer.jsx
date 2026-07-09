import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0A1931] border-t border-[#4A7FA7]">
      <div className="max-w-7xl mx-auto px-6 py-6">

      
        <div className="text-center">
          <Link to="/" className="text-4xl font-bold text-white">
            IdeaPulse
          </Link>

          <p className="mt-2 text-gray-400">
            Validate your startup ideas before you build.
          </p>
        </div>

       
        <div className="my-8 border-t border-[#4A7FA7]/40"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-400 text-center">
            © 2026 IdeaPulse. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;