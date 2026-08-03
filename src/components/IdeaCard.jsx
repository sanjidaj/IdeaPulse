import { useState } from "react";
import api from "../services/api";

import {
    BiLike,
    BiSolidLike,
    BiDislike,
    BiSolidDislike,
} from "react-icons/bi";

import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";

const IdeaCard = ({
    idea,
    showActions = false,
    onDelete,
    onEdit,
}) => {
    const [reaction, setReaction] = useState(null);

    const [upvotes, setUpvotes] = useState(
        idea.upvotes || 0
    );

    const [downvotes, setDownvotes] = useState(
        idea.downvotes || 0
    );
    const user = JSON.parse(localStorage.getItem("user"));

    const [saved, setSaved] = useState(
        idea.savedBy?.includes(user?.email) || false
    );



    const [showComments, setShowComments] = useState(false);

    const [comment, setComment] = useState("");

    const [comments, setComments] = useState(
        idea.comments || []
    );

    const handleLike = async () => {
        if (reaction === "like") return;

        try {
            await api.put(`/ideas/${idea._id}/like`);

            if (reaction === "dislike") {
                setDownvotes((prev) => prev - 1);
            }

            setUpvotes((prev) => prev + 1);

            setReaction("like");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDislike = async () => {
        if (reaction === "dislike") return;

        try {
            await api.put(`/ideas/${idea._id}/dislike`);

            if (reaction === "like") {
                setUpvotes((prev) => prev - 1);
            }

            setDownvotes((prev) => prev + 1);

            setReaction("dislike");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const res = await api.put(`/ideas/${idea._id}/save`, {
                email: user.email,
            });

            setSaved(res.data.saved);
        } catch (error) {
            console.log(error);
        }
    };
    const handleComment = async () => {

        if (comment.trim() === "") return;

        try {

            const res = await api.post(
                `/ideas/${idea._id}/comment`,
                {
                    user: user.name,
                    text: comment,
                }
            );

            setComments(res.data.comments);

            setComment("");

        } catch (error) {

            console.log(error);

        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 sm:p-7 mb-6 border border-gray-100 transition-all duration-300">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-[#1A3D63] text-white flex items-center justify-center font-bold text-lg">
                    {idea.createdBy.charAt(0).toUpperCase()}
                </div>

                <div>

                    <h2 className="font-semibold text-[#1A3D63]">
                        {idea.createdBy}
                    </h2>

                    <p className="text-xs text-gray-400">
                        {new Date(idea.createdAt).toLocaleString()}
                    </p>

                </div>

            </div>

            {/* Title */}

            <h1 className="text-2xl font-bold text-[#1A3D63] mt-5">
                {idea.title}
            </h1>

            {/* Category */}

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#EAF3FB] text-[#1A3D63] text-sm">
                {idea.category}
            </span>

            {/* Description */}

            <p className="mt-4 text-gray-700 leading-relaxed">
                {idea.description}
            </p>

            {/* Problem */}

            <div className="mt-5 bg-gray-50 rounded-xl p-4">

                <h3 className="font-semibold text-[#1A3D63]">
                    Problem
                </h3>

                <p className="text-gray-600 mt-2">
                    {idea.problem}
                </p>

            </div>

            {/* Solution */}

            <div className="mt-4 bg-gray-50 rounded-xl p-4">

                <h3 className="font-semibold text-[#1A3D63]">
                    Solution
                </h3>

                <p className="text-gray-600 mt-2">
                    {idea.solution}
                </p>

            </div>

            {/* Footer Starts Here */}
            {/* Footer */}
            <div className="border-t border-gray-200 mt-6 pt-4">

                {showActions ? (

                    // My Ideas Page
                    <div className="flex justify-evenly">

                        <button
                            onClick={() => onEdit(idea)}
                            className="bg-[#1A3D63] hover:bg-[#4A7FA7] transition text-white px-5 py-2 rounded-xl flex items-center gap-2"
                        >
                            <FaEdit />
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(idea._id)}
                            className="text-red-500 hover:text-red-600 flex items-center gap-2"
                        >
                            <FaTrash />
                            Delete
                        </button>

                    </div>

                ) : (

                    // Homepage 
                    <div className="flex justify-between items-center">

                        {/* Like */}
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${reaction === "like"
                                ? "bg-[#EAF3FB] text-[#1A3D63]"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {reaction === "like" ? (
                                <BiSolidLike size={22} />
                            ) : (
                                <BiLike size={22} />
                            )}

                            <span>{upvotes}</span>
                        </button>

                        {/* Dislike */}
                        <button
                            onClick={handleDislike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${reaction === "dislike"
                                ? "bg-gray-100 text-gray-800"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {reaction === "dislike" ? (
                                <BiSolidDislike size={22} />
                            ) : (
                                <BiDislike size={22} />
                            )}

                            <span>{downvotes}</span>
                        </button>

                        {/* Comment */}
                        <button
                            onClick={() =>
                                setShowComments(!showComments)
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"
                        >
                            <MdOutlineInsertComment size={22} />

                            <span>
                                Comment
                            </span>
                        </button>

                        {/* Save */}
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${saved
                                ? "text-red-500"
                                : "text-gray-500 hover:text-red-500"
                                }`}
                        >
                            {saved ? (
                                <FaHeart className="text-xl" />
                            ) : (
                                <IoMdHeartEmpty className="text-xl" />
                            )}

                            <span>{saved ? "Saved" : "Save"}</span>
                        </button>

                    </div>

                )}

            </div>
            {
                showComments && (

                    <div className="mt-6">

                        <div className="flex gap-3">

                            <input

                                type="text"

                                value={comment}

                                onChange={(e) =>

                                    setComment(e.target.value)

                                }

                                placeholder="Write a comment..."

                                className="flex-1 border rounded-xl p-3 outline-none"

                            />

                            <button

                                onClick={handleComment}

                                className="bg-[#1A3D63] text-white px-5 rounded-xl"

                            >

                                Post

                            </button>

                        </div>

                        <div className="mt-5 space-y-3">

                            {comments.map((c, index) => (

                                <div

                                    key={index}

                                    className="bg-[#F5F7FA] rounded-xl p-3"

                                >

                                    <h3 className="font-semibold text-[#1A3D63]">

                                        {c.user}

                                    </h3>

                                    <p className="text-gray-600">

                                        {c.text}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                )
            }

        </div>
    );
};

export default IdeaCard;