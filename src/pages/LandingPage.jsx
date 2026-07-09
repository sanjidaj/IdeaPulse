import { Link } from "react-router";

const LandingPage = () => {
    return (
        <div className="">
            <h1>IdeaPulse</h1>
            <p>Validate your startup idea before building it.</p>
            <p>Share ideas, collect feedback, measure public interest, and discover your next big opportunity.</p>
            <Link to="/login">
                <button className="btn btn-primary">Get Started</button>

            </Link>

        </div>
    );
};

export default LandingPage;