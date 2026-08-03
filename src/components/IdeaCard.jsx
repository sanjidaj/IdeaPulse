import { useState } from "react";
import api from "../services/api";

import {
    BiLike,
    BiSolidLike,
    BiDislike,
    BiSolidDislike,
} from "react-icons/bi";

import { FaEdit, FaExclamationTriangle, FaLightbulb, FaTrash } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const IdeaCard = ({
    idea,
    showActions = false,
    onDelete,
    onEdit,
}) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [likedBy, setLikedBy] = useState(
        idea.likedBy || []
    );

    const [dislikedBy, setDislikedBy] = useState(
        idea.dislikedBy || []
    );

    const liked = likedBy.includes(user.email);
    const disliked = dislikedBy.includes(user.email);

 
    

    const [saved, setSaved] = useState(
        idea.savedBy?.includes(user?.email) || false
    );

    const [showComments, setShowComments] = useState(false);

    const [comment, setComment] = useState("");

    const [comments, setComments] = useState(
        idea.comments || []
    );

    const handleLike = async () => {
        const res = await api.put(
            `/ideas/${idea._id}/like`,
            {
                email: user.email,
            }
        );

        setLikedBy(res.data.idea.likedBy);
        setDislikedBy(res.data.idea.dislikedBy);
    };

    const handleDislike = async () => {
        const res = await api.put(
            `/ideas/${idea._id}/dislike`,
            {
                email: user.email,
            }
        );

        setLikedBy(res.data.idea.likedBy);
        setDislikedBy(res.data.idea.dislikedBy);
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

    const handleCommentKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleComment();
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 mb-6 border border-gray-100 transition-shadow duration-300">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] text-white flex items-center justify-center font-semibold text-base shadow-sm">
                        {idea.createdBy.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#1A3D63] text-sm">
                            {idea.createdBy}
                        </h2>

                        <p className="text-xs text-gray-400">
                            {new Date(idea.createdAt).toLocaleString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#EAF3FB] text-[#1A3D63] text-xs font-medium tracking-wide">
                    {idea.category}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F2A47] mt-5 leading-snug">
                {idea.title}
            </h1>

            {/* Description */}
            <p className="mt-3 text-gray-600 leading-relaxed text-[15px]">
                {idea.description}
            </p>

            {/* Problem / Solution */}
            <div className="mt-6 grid gap-4">

                {/* Problem */}
                <div className="group rounded-2xl border border-[#D8EAF6] bg-[#F7FBFE] p-5 hover:border-[#B9D9EE] hover:shadow-md hover:shadow-[#4A7FA7]/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#DDEEF9] flex items-center justify-center group-hover:bg-[#1A3D63] transition-colors duration-300">
                            <FaExclamationTriangle className="text-[#4A7FA7] group-hover:text-white text-base transition-colors duration-300" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#1A3D63] text-sm">
                                Problem
                            </h3>
                            <p className="text-xs text-gray-400">
                                Challenge to solve
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm">
                        {idea.problem}
                    </p>
                </div>

                {/* Solution */}
                <div className="group rounded-2xl border border-[#D8EAF6] bg-[#F7FBFE] p-5 hover:border-[#B9D9EE] hover:shadow-md hover:shadow-[#4A7FA7]/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#DDEEF9] flex items-center justify-center group-hover:bg-[#1A3D63] transition-colors duration-300">
                            <FaLightbulb className="text-[#4A7FA7] group-hover:text-white text-base transition-colors duration-300" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#1A3D63] text-sm">
                                Solution
                            </h3>
                            <p className="text-xs text-gray-400">
                                Proposed approach
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm">
                        {idea.solution}
                    </p>
                </div>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 mt-6 pt-4">

                {showActions ? (

                    // My Ideas Page
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => onEdit(idea)}
                            className="text-[#1A3D63] hover:bg-[#264F7E] hover:text-white transition-colors px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium"
                        >
                            <FaEdit size={14} />
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(idea._id)}
                            className="text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                        >
                            <FaTrash size={13} />
                            Delete
                        </button>
                    </div>

                ) : (

                    // Homepage
                    <div className="flex items-center justify-between">

                        <div className="flex items-center  p-1">
                            {/* Like */}
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${liked
                                    ? "bg-white text-[#1A3D63] font-medium"
                                    : "text-gray-500 hover:text-[#1A3D63]"
                                    }`}
                            >
                                {liked ? (
                                    <BiSolidLike size={18} />
                                ) : (
                                    <BiLike size={18} />
                                )}
                                <span>{likedBy.length}</span>
                            </button>

                            {/* Dislike */}
                            <button
                                onClick={handleDislike}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${disliked
                                    ? "bg-white text-gray-800 font-medium"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {disliked ? (
                                    <BiSolidDislike size={18} />
                                ) : (
                                    <BiDislike size={18} />
                                )}
                                <span>{dislikedBy.length}</span>                           
                             </button>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Comment */}
                            <button
                                onClick={() => setShowComments(!showComments)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${showComments
                                    ? "bg-[#EAF3FB] text-[#1A3D63] font-medium"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                <MdOutlineInsertComment size={19} />
                                <span>{comments.length > 0 ? comments.length : "Comment"}</span>
                            </button>

                            {/* Save */}
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${saved
                                    ? "text-[#E0263A] bg-[#FCE8EA] font-medium"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                {saved ? (
                                    <FaHeart size={16} />
                                ) : (
                                    <IoMdHeartEmpty size={19} />
                                )}
                                <span>{saved ? "Saved" : "Save"}</span>
                            </button>
                        </div>

                    </div>

                )}

            </div>

            {/* Comments */}
            {showComments && (
                <div className="mt-5 pt-5 border-t border-gray-100">

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={handleCommentKeyDown}
                            placeholder="Write a comment..."
                            className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#4A7FA7] focus:ring-2 focus:ring-[#EAF3FB] transition"
                        />

                        <button
                            onClick={handleComment}
                            disabled={comment.trim() === ""}
                            aria-label="Send comment"
                            className="shrink-0 w-10 h-10 rounded-full bg-[#1A3D63] text-white flex items-center justify-center hover:bg-[#264F7E] disabled:opacity-40 disabled:hover:bg-[#1A3D63] transition-colors"
                        >
                            <IoSend size={16} />
                        </button>
                    </div>

                    <div className="mt-4 space-y-2.5">
                        {comments.map((c, index) => (
                            <div
                                key={index}
                                className="flex gap-3 bg-[#F7F9FB] rounded-2xl p-3.5"
                            >
                                <div className="w-8 h-8 shrink-0 rounded-full bg-[#4A7FA7] text-white flex items-center justify-center text-xs font-semibold">
                                    {c.user?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1A3D63] text-sm">
                                        {c.user}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        {c.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div>
    );
};

export default IdeaCard;