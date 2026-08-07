import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";

import { IoMdArrowRoundBack } from "react-icons/io";

const IdeaDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  const openComments = location.state?.openComments || false;

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await api.get(`/ideas/${id}`);
        setIdea(res.data.idea);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <p className="text-gray-500">Loading idea...</p>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-[#1A3D63]">
          Idea not found
        </h2>

        <button
          onClick={() => navigate("/homepage")}
          className="mt-4 px-5 py-2 rounded-xl bg-[#1A3D63] text-white"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-2xl font-semibold text-[#1A3D63] hover:text-[#4A7FA7]"
        >
          <IoMdArrowRoundBack/>
        </button>

        <IdeaCard
          idea={idea}
          openComments={openComments}
        />

      </div>
    </div>
  );
};

export default IdeaDetails;