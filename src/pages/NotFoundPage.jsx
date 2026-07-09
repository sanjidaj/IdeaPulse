import { Link } from "react-router";


const NotFoundPage = () => {
    return (
        <div className="text-center space-y-2 mt-40 ">
            <h1 className="text-8xl font-bold text-black">404</h1>
            <p className="text-xl font-bold font-serif">Page Not Found</p>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">
            <button className="btn btn-primary">Go back home</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;