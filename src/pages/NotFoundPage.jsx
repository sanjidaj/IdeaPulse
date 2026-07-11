import { Link } from "react-router";


const NotFoundPage = () => {
     return (
        <div className="text-center space-y-2 mt-40 ">
            <h1 className="text-8xl font-bold text-[#1d405a]">404</h1>
            <p className="text-xl font-bold font-serif text-[#1d405a]">Page Not Found</p>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">
            <button className="btn bg-[#0A1931] text-white">Go back home</button>
            </Link>
            
        </div>
    );
};

export default NotFoundPage;