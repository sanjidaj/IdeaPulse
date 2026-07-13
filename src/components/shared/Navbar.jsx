import { Link } from "react-router";
import logoImg from "../../assets/logo.png"
import LogoText from "../../assets/logoText.png"
import { IoIosSearch } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
     return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo image */}
        <Link to="/homepage" className="flex items-center">
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
            <Link to="/homepage"  className=" text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
               <AiOutlineHome/>Home
            </Link>
          </li>

          <li>
            <Link to="/explore"  className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
              <IoIosSearch/>Explore
            </Link>
          </li>
          <li>
            <Link to="/submitidea" className="text-xs hover:text-[#4A7FA7] transition text-[#1A3D63] hover:underline flex items-center gap-1">
               <FiPlus/>Submit idea
            
            </Link>
          </li>
          

          
        </ul>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
                     <label className="input flex-1">
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
            className="bg-[#0A1931] shrink-0 text-white px-5 py-2 rounded-xl font-medium hover:bg-[#4A7FA7] transition shadow-md"
          >
            Log Out
          </Link>
        </div>
        

      </div>
    </nav>
  );
};

export default Navbar;