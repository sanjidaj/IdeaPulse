import { BiDislike, BiLike } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineInsertComment } from "react-icons/md";


const IdeaCard = ({ idea, showActions = false }) => {
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
            {/* Footer */}
            <div className="border-t mt-6 pt-4">

                {showActions ? (

                    // My Ideas Page
                    <div className="flex justify-evenly gap-3">
                        <button className="bg-linear-to-r from-[#1A3D63] to-[#4A7FA7] hover:from-[#1A3D63] hover:to-[#1A3D63] transition-all duration-300 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
                            <FaEdit />
                            Edit
                        </button>

                        <button className="font-semibold flex items-center gap-2 text-red-500 hover:text-red-600">
                            <FaTrash />
                            Delete
                        </button>
                    </div>

                ) : (

                    // Homepage
                    <div className="flex justify-around">

                        <button className="flex items-center gap-2 text-gray-600 ">
                            <BiLike />Like
                        </button>

                        <button className="flex items-center gap-2 text-gray-600">
                            <BiDislike /> Dislike
                        </button>

                        <button className="flex items-center gap-2 text-gray-600 ">
                            <MdOutlineInsertComment />Comment
                        </button>

                        <button className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition">
                            <IoMdHeartEmpty />
                            Save
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};

export default IdeaCard;