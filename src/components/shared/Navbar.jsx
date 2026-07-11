import { Link } from "react-router";
import logoImg from "../../assets/logo.png"
import LogoText from "../../assets/logoText.png"

const Navbar = () => {
     return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo image */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg} 
            alt="Logo"
            className="h-10"
          />
          {/* Logo Text*/}
          <img
            src={LogoText} 
            alt="LogoText"
            className="h-7"
          />
          
        </Link>

        {/* navigation link */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link to="features"  className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
               Features
            </Link>
          </li>

          <li>
            <Link to="/about"  className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
              About
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
               How It Works
            
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
              Contact
            </Link>
          </li>

          
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-2">
                     <label className="input">
                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                             <g
                                 strokeLinejoin="round"
                                 strokeLinecap="round"
                                 strokeWidth="2.5"
                                 fill="none"
                                 stroke="currentColor"
                             >
                                 <circle cx="11" cy="11" r="8"></circle>
                                 <path d="m21 21-4.3-4.3"></path>
                             </g>
                         </svg>
                         <input type="search" required placeholder="Search" />
                     </label>

          <Link
            to="/"
            className="bg-[#0A1931] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#4A7FA7] transition shadow-md"
          >
            Log Out
          </Link>
        </div>
        

      </div>
    </nav>
  );
};

export default Navbar;