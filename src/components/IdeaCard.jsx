import { BiDislike, BiLike } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineInsertComment } from "react-icons/md";


const IdeaCard = ({ idea, showActions = false }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 sm:p-7 mb-6 border border-gray-100 transition-shadow duration-300">

            {/* Header */}
            <div className="flex items-center gap-3">

                <div className="w-12 h-12 shrink-0 rounded-full bg-[#1A3D63] text-white flex items-center justify-center font-bold text-lg ring-2 ring-[#EAF3FB]">
                    {idea.createdBy.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h2 className="font-semibold text-[#1A3D63]">
                        {idea.createdBy}
                    </h2>

                    <p className="text-gray-400 text-xs">
                        {new Date(idea.createdAt).toLocaleString()}
                    </p>
                </div>

            </div>

            {/* Idea Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A3D63] mt-5 leading-snug">
                {idea.title}
            </h1>

            {/* Category */}
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#EAF3FB] text-[#1A3D63] text-xs font-medium tracking-wide">
                {idea.category}
            </span>

            {/* Description */}
            <p className="text-gray-700 mt-4 leading-relaxed">
                {idea.description}
            </p>

            {/* Problem */}
            <div className="mt-5 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-semibold text-[#1A3D63] text-sm uppercase tracking-wide">
                    Problem
                </h3>

                <p className="text-gray-600 mt-1.5 leading-relaxed">
                    {idea.problem}
                </p>
            </div>

            {/* Solution */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-semibold text-[#1A3D63] text-sm uppercase tracking-wide">
                    Solution
                </h3>

                <p className="text-gray-600 mt-1.5 leading-relaxed">
                    {idea.solution}
                </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 mt-6 pt-4">

                {showActions ? (

                    // My Ideas Page
                    <div className="flex justify-evenly gap-3">
                        <button className="bg-[#1A3D63] hover:bg-[#4A7FA7] transition-all duration-300 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95">
                            <FaEdit />
                            Edit
                        </button>

                        <button className="font-semibold flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors duration-200 active:scale-95">
                            <FaTrash />
                            Delete
                        </button>
                    </div>

                ) : (

                    // Homepage
                    <div className="flex justify-around">

                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#1A3D63] hover:bg-[#F5F9FD] px-3 py-2 rounded-lg transition-colors duration-200">
                            <BiLike className="text-lg" />
                            <span className="text-sm font-medium">Like</span>
                        </button>

                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#1A3D63] hover:bg-[#F5F9FD] px-3 py-2 rounded-lg transition-colors duration-200">
                            <BiDislike className="text-lg" />
                            <span className="text-sm font-medium">Dislike</span>
                        </button>

                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#1A3D63] hover:bg-[#F5F9FD] px-3 py-2 rounded-lg transition-colors duration-200">
                            <MdOutlineInsertComment className="text-lg" />
                            <span className="text-sm font-medium">Comment</span>
                        </button>

                        <button className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 px-3 py-2 rounded-lg transition-colors duration-200">
                            <IoMdHeartEmpty className="text-lg" />
                            <span className="text-sm font-medium">Save</span>
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};

export default IdeaCard;