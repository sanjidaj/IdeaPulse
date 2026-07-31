import { useEffect, useState } from "react";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";

const ExploreIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "AI",
    "Education",
    "Healthcare",
    "Environment",
    "Finance",
    "E-commerce",
    "Other",
  ];

  useEffect(() => {
    async function loadIdeas() {
      try {
        const res = await api.get("/ideas");
        const allIdeas = res.data.ideas || [];

        setIdeas(allIdeas);
        setFilteredIdeas(allIdeas);
      } catch (error) {
        console.log(error);
      }
    }

    loadIdeas();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      setFilteredIdeas(ideas);
    } else {
      setFilteredIdeas(
        ideas.filter((idea) => idea.category === selectedCategory)
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#1A3D63] mb-3">
        Explore Ideas
      </h1>

      <p className="text-gray-600 mb-8">
        Discover innovative startup ideas shared by the community.
      </p>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategoryChange(item)}
            className={`px-5 py-2 rounded-full font-medium shadow-sm transition-all duration-300
              ${
                category === item
                  ? "bg-[#1A3D63] text-white shadow-md"
                  : "bg-white border border-gray-300 text-[#1A3D63] hover:bg-[#EAF3FB]"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Ideas */}
      {filteredIdeas.length > 0 ? (
        filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea._id}
            idea={idea}
          />
        ))
      ) : (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#1A3D63]">
            No ideas found
          </h2>

          <p className="text-gray-500 mt-2">
            There are no startup ideas in this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExploreIdeas;