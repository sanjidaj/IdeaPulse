const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0A1931] border-t border-[#4A7FA7]/20">
  
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-[#4A7FA7]/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
       

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-5">
        
          <p className="text-sm text-gray-400 text-center">
            © 2026 IdeaPulse. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#"
              className="relative text-sm text-gray-400 transition-all duration-300 hover:text-[#4A7FA7] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4A7FA7] after:transition-all after:duration-300 hover:after:w-full"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="relative text-sm text-gray-400 transition-all duration-300 hover:text-[#4A7FA7] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4A7FA7] after:transition-all after:duration-300 hover:after:w-full"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="relative text-sm text-gray-400 transition-all duration-300 hover:text-[#4A7FA7] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4A7FA7] after:transition-all after:duration-300 hover:after:w-full"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;