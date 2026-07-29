import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";

const Homepage = () => {
  const [ideas, setIdeas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadIdeas() {
      try {
        const res = await api.get("/ideas");
        setIdeas(res.data.ideas || []);
      } catch (error) {
        console.error(error);
      }
    }

    loadIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mx-auto p-4 sm:p-6 lg:p-8">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Share Idea Card */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1A3D63] tracking-tight flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  What's your startup idea today?
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed">
                  Share your innovative startup idea with the community.
                </p>
              </div>

              <button
                onClick={() => navigate("/submit-idea")}
                className="shrink-0 bg-[#1A3D63] text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:bg-[#4A7FA7] hover:shadow-md active:scale-95 transition-all duration-200"
              >
                Share Your Idea
              </button>
            </div>
          </div>

          {/* Feed */}
          {ideas.length > 0 ? (
            <div className="space-y-5">
              {ideas.map((idea) => (
                <div
                  key={idea._id}
                  className="transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <IdeaCard idea={idea} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 sm:p-14 text-center">

              <h2 className="text-xl font-semibold text-[#1A3D63] tracking-tight">
                No ideas yet
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Be the first to share a startup idea!
              </p>

              <button
                onClick={() => navigate("/submit-idea")}
                className="mt-6 bg-[#1A3D63] text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:bg-[#4A7FA7] hover:shadow-md active:scale-95 transition-all duration-200"
              >
                Submit Your First Idea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;