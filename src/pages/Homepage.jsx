import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import IdeaCard from "../components/IdeaCard";

const Homepage = () => {
  const [ideas, setIdeas] = useState([]);
  const [open, setOpen] = useState(true);

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
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Share Idea Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#1A3D63]">
              💡 What's your startup idea today?
            </h2>

            <p className="text-gray-500 mt-2">
              Share your innovative startup idea with the community.
            </p>

            <button
              onClick={() => navigate("/submit-idea")}
              className="mt-5 bg-[#1A3D63] text-white px-6 py-3 rounded-xl hover:bg-[#4A7FA7] transition"
            >
              Share Your Idea
            </button>
          </div>

          {/* Feed */}
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <h2 className="text-xl font-semibold text-[#1A3D63]">
                No ideas yet
              </h2>

              <p className="text-gray-500 mt-2">
                Be the first to share a startup idea!
              </p>

              <button
                onClick={() => navigate("/submit-idea")}
                className="mt-6 bg-[#1A3D63] text-white px-6 py-3 rounded-xl hover:bg-[#4A7FA7] transition"
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