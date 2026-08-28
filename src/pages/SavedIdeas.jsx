
import { useEffect, useState } from "react";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";
import { FaRegHeart } from "react-icons/fa";

const SavedIdeas = () => {
  const [ideas, setIdeas] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSavedIdeas = async () => {
      try {
        const res = await api.get(`/ideas/saved/${user.email}`);

        setIdeas(res.data.ideas || []);
      } catch (error) {
        console.log(error);
        setIdeas([]);
      }
    };

    if (user?.email) {
      fetchSavedIdeas();
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#1A3D63] mb-2">
          📌 Saved Ideas
        </h1>

        <p className="text-gray-500 mb-8">
          Ideas you've bookmarked.
        </p>

        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A3D63]/10 text-[#1A3D63]">
              <FaRegHeart className="text-2xl" />
            </div>

            <h2 className="text-xl font-semibold text-[#1A3D63]">
              No saved ideas
            </h2>

            <p className="text-gray-500 mt-2">
              Save ideas to read them later.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default SavedIdeas;

