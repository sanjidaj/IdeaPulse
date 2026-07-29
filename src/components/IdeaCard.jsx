import {
  FaHeart,
  FaRegCommentDots,
  FaRegBookmark,
} from "react-icons/fa";

const IdeaCard = ({ idea }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-[#1A3D63] text-white flex items-center justify-center font-bold text-lg">
          {idea.createdBy.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold text-[#1A3D63]">
            {idea.createdBy}
          </h2>

          <p className="text-gray-500 text-sm">
            {new Date(idea.createdAt).toLocaleString()}
          </p>
        </div>

      </div>

      {/* Idea Title */}
      <h1 className="text-2xl font-bold text-[#1A3D63] mt-5">
        {idea.title}
      </h1>

      {/* Category */}
      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EAF3FB] text-[#1A3D63] text-sm">
        {idea.category}
      </span>

      {/* Description */}
      <p className="text-gray-700 mt-4">
        {idea.description}
      </p>

      {/* Problem */}
      <div className="mt-5">
        <h3 className="font-semibold text-[#1A3D63]">
          Problem
        </h3>

        <p className="text-gray-600">
          {idea.problem}
        </p>
      </div>

      {/* Solution */}
      <div className="mt-5">
        <h3 className="font-semibold text-[#1A3D63]">
          Solution
        </h3>

        <p className="text-gray-600">
          {idea.solution}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-around border-t mt-6 pt-4">

        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
          <FaHeart />
          Like
        </button>

        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <FaRegCommentDots />
          Comment
        </button>

        <button className="flex items-center gap-2 text-gray-600 hover:text-yellow-500">
          <FaRegBookmark />
          Save
        </button>

      </div>

    </div>
  );
};

export default IdeaCard;