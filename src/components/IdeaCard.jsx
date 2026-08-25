import { useState } from "react";
import api from "../services/api";

import {
    BiLike,
    BiSolidLike,
    BiDislike,
    BiSolidDislike,
} from "react-icons/bi";

import {
    FaEdit,
    FaExclamationTriangle,
    FaLightbulb,
    FaTrash,
    FaHeart,
    FaRocket,
    FaCheckCircle,
    FaAdjust,
    FaRegClock,
    FaExclamationCircle,
    FaChartLine,
    FaChevronDown,
    FaChevronUp,
    FaBookmark,
} from "react-icons/fa";

import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const IdeaCard = ({
    idea,
    showActions = false,
    onDelete,
    onEdit,
    openComments = false,
}) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [likedBy, setLikedBy] = useState(idea.likedBy || []);

    const [dislikedBy, setDislikedBy] = useState(idea.dislikedBy || []);

    const [savedBy, setSavedBy] = useState(idea.savedBy || []);

    const liked = likedBy.includes(user.email);
    const disliked = dislikedBy.includes(user.email);

    const [saved, setSaved] = useState(
        idea.savedBy?.includes(user?.email) || false
    );

    const [showComments, setShowComments] = useState(openComments);
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState(idea.comments || []);

    const [showValidation, setShowValidation] = useState(false);

    const likes = likedBy.length;
    const saves = savedBy.length;
    const commentCount = comments.length;

    const validationScore = Math.min(
        100,
        likes * 4 + saves * 5 + commentCount * 3
    );

    const getValidationStatus = (score) => {
        if (score >= 85) return "Highly Validated";
        if (score >= 70) return "Promising Idea";
        if (score >= 50) return "Moderate Interest";
        if (score >= 30) return "Early Interest";
        return "Low Interest";
    };

    const getStatusIcon = (score) => {
        if (score >= 85) return FaRocket;
        if (score >= 70) return FaCheckCircle;
        if (score >= 50) return FaAdjust;
        if (score >= 30) return FaRegClock;
        return FaExclamationCircle;
    };

    const getStatusColor = (score) => {
        if (score >= 85)
            return {
                solid: "#22C55E",
                soft: "#F0FDF4",
            };

        if (score >= 70)
            return {
                solid: "#FACC15",
                soft: "#F7FEE7",
            };

        if (score >= 50)
            return {
                solid: "#F59E0B",
                soft: "#FFFBEB",
            };

        if (score >= 30)
            return {
                solid: "#F97316",
                soft: "#FFF7ED",
            };

        return {
            solid: "#EF4444",
            soft: "#FEF2F2",
        };
    };

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
            const res = await api.put(
                `/ideas/${idea._id}/save`,
                {
                    email: user.email,
                }
            );

            setSaved(res.data.saved);

            setSavedBy((prev) => {
                if (res.data.saved) {
                    return [...prev, user.email];
                }

                return prev.filter(
                    (email) => email !== user.email
                );
            });
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
        <div className="w-full min-w-0 bg-white rounded-3xl shadow-sm hover:shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 border border-gray-100 transition-shadow duration-300">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

                    <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] text-white flex items-center justify-center font-semibold text-sm sm:text-base shadow-sm">
                        {idea.createdBy.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <h2 className="font-semibold text-[#1A3D63] text-sm truncate">
                            {idea.createdBy}
                        </h2>

                        <p className="text-xs text-gray-400 truncate">
                            {new Date(
                                idea.createdAt
                            ).toLocaleString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>

                <span className="shrink-0 max-w-[40%] px-2.5 sm:px-3 py-1 rounded-full bg-[#EAF3FB] text-[#1A3D63] text-[10px] sm:text-xs font-medium tracking-wide truncate">
                    {idea.category}
                </span>

            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F2A47] mt-4 sm:mt-5 leading-snug break-words">
                {idea.title}
            </h1>

            {/* Description */}
            <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-[15px] break-words">
                {idea.description}
            </p>

            {/* Problem / Solution */}
            <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4">

                {/* Problem */}
                <div className="group rounded-2xl border border-[#D8EAF6] bg-[#F7FBFE] p-4 sm:p-5 hover:border-[#B9D9EE] hover:shadow-md hover:shadow-[#4A7FA7]/10 transition-all duration-300">

                    <div className="flex items-center gap-3 mb-3">

                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#DDEEF9] flex items-center justify-center">
                            <FaExclamationTriangle className="text-[#4A7FA7]" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-semibold text-[#1A3D63] text-sm">
                                Problem
                            </h3>

                            <p className="text-xs text-gray-400">
                                Challenge to solve
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm break-words">
                        {idea.problem}
                    </p>
                </div>

                {/* Solution */}
                <div className="group rounded-2xl border border-[#D8EAF6] bg-[#F7FBFE] p-4 sm:p-5 hover:border-[#B9D9EE] hover:shadow-md hover:shadow-[#4A7FA7]/10 transition-all duration-300">

                    <div className="flex items-center gap-3 mb-3">

                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#DDEEF9] flex items-center justify-center">
                            <FaLightbulb className="text-[#4A7FA7]" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-semibold text-[#1A3D63] text-sm">
                                Solution
                            </h3>

                            <p className="text-xs text-gray-400">
                                Proposed approach
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm break-words">
                        {idea.solution}
                    </p>
                </div>

            </div>

            {/* Validation Score */}
            <div className="mt-5">

                <button
                    onClick={() =>
                        setShowValidation(!showValidation)
                    }
                    className="flex items-center gap-2 text-sm font-medium text-[#1A3D63] hover:text-[#4A7FA7] transition-colors"
                >
                    <FaChartLine size={14} />

                    <span>
                        {showValidation
                            ? "Hide Validation Score"
                            : "View Validation Score"}
                    </span>

                    {showValidation ? (
                        <FaChevronUp
                            size={10}
                            className="text-gray-400"
                        />
                    ) : (
                        <FaChevronDown
                            size={10}
                            className="text-gray-400"
                        />
                    )}
                </button>

                {showValidation &&
                    (() => {
                        const StatusIcon =
                            getStatusIcon(validationScore);

                        const { solid, soft } =
                            getStatusColor(validationScore);

                        const radius = 34;

                        const circumference =
                            2 * Math.PI * radius;

                        const offset =
                            circumference -
                            (validationScore / 100) *
                            circumference;

                        return (
                            <div className="mt-4 rounded-2xl border border-[#D8EAF6] bg-linear-to-br from-[#F7FBFE] to-white p-4 sm:p-6 shadow-sm">

                                {/* Score Header */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5">

                                    <div className="w-full sm:w-auto text-center sm:text-left">

                                        <h3 className="font-semibold text-[#1A3D63] text-base">
                                            Idea Validation Score
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Based on community engagement
                                        </p>

                                        <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold border" style={{
                                            backgroundColor:
                                                soft,
                                            color: solid,
                                            borderColor:
                                                solid + "33",
                                        }}>
                                            <StatusIcon
                                                size={12}
                                                style={{
                                                    color: solid,
                                                }}
                                            />

                                            {getValidationStatus(
                                                validationScore
                                            )}
                                        </span>
                                    </div>

                                    {/* Circular progress */}
                                    <div className="relative w-24 h-24 shrink-0">

                                        <svg
                                            viewBox="0 0 80 80"
                                            className="w-24 h-24 -rotate-90"
                                        >
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r={radius}
                                                fill="none"
                                                stroke="#E5EEF5"
                                                strokeWidth="8"
                                            />

                                            <circle
                                                cx="40"
                                                cy="40"
                                                r={radius}
                                                fill="none"
                                                stroke={solid}
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={
                                                    circumference
                                                }
                                                strokeDashoffset={
                                                    offset
                                                }
                                                style={{
                                                    transition:
                                                        "stroke-dashoffset 0.6s ease, stroke 0.4s ease",
                                                }}
                                            />
                                        </svg>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                                            <span className="text-xl font-bold text-[#1A3D63] leading-none">
                                                {validationScore}
                                            </span>

                                            <span className="text-[10px] text-gray-400 mt-0.5">
                                                / 100
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-5">

                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${validationScore}%`,
                                            backgroundColor:
                                                solid,
                                        }}
                                    />
                                </div>

                                {/* Breakdown */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5">

                                    {/* Likes */}
                                    <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-2.5 sm:p-3.5 border border-gray-100 hover:border-[#D8EAF6] hover:shadow-sm transition-all">

                                        <div className="w-8 h-8 rounded-full bg-[#e7fff0] flex items-center justify-center">
                                            <FaHeart
                                                className="text-[#22C55E]"
                                                size={13}
                                            />
                                        </div>

                                        <p className="font-bold text-[#22C55E] leading-none">
                                            {likes}
                                        </p>

                                        <p className="text-[10px] sm:text-[11px] text-[#22C55E]">
                                            Likes
                                        </p>
                                    </div>

                                    {/* Saves */}
                                    <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-2.5 sm:p-3.5 border border-gray-100 hover:border-[#D8EAF6] hover:shadow-sm transition-all">

                                        <div className="w-8 h-8 rounded-full bg-[#fff8f8] flex items-center justify-center">
                                            <FaBookmark
                                                className="text-[#EF4444]"
                                                size={12}
                                            />
                                        </div>

                                        <p className="text-base font-bold text-[#EF4444] leading-none">
                                            {saves}
                                        </p>

                                        <p className="text-[10px] sm:text-[11px] text-[#EF4444]">
                                            Saves
                                        </p>
                                    </div>

                                    {/* Comments */}
                                    <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-2.5 sm:p-3.5 border border-gray-100 hover:border-[#D8EAF6] hover:shadow-sm transition-all">

                                        <div className="w-8 h-8 rounded-full bg-[#EAF3FB] flex items-center justify-center">
                                            <MdOutlineInsertComment
                                                className="text-[#4A7FA7]"
                                                size={15}
                                            />
                                        </div>

                                        <p className="text-base font-bold text-[#4A7FA7] leading-none">
                                            {commentCount}
                                        </p>

                                        <p className="text-[10px] sm:text-[11px] text-[#4A7FA7]">
                                            Comments
                                        </p>
                                    </div>

                                </div>

                            </div>
                        );
                    })()}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 mt-5 sm:mt-6 pt-4">

                {showActions ? (

                    /* My Ideas Page */
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">

                        <button
                            onClick={() => onEdit(idea)}
                            className="text-[#1A3D63] hover:bg-[#264F7E] hover:text-white transition-colors px-5 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <FaEdit size={14} />
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(idea._id)}
                            className="text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                        >
                            <FaTrash size={13} />
                            Delete
                        </button>
                    </div>

                ) : (

                    /* Homepage */
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        {/* Like / Dislike */}
                        <div className="flex items-center justify-between sm:justify-start p-1 w-full sm:w-auto">

                            {/* Like */}
                            <button
                                onClick={handleLike}
                                className={`flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${liked
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
                                className={`flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${disliked
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

                        {/* Comment / Save */}
                        <div className="flex items-center justify-between sm:justify-end gap-1 w-full sm:w-auto">

                            {/* Comment */}
                            <button
                                onClick={() =>
                                    setShowComments(
                                        !showComments
                                    )
                                }
                                className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${showComments
                                    ? "bg-[#EAF3FB] text-[#1A3D63] font-medium"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                <MdOutlineInsertComment size={19} />

                                <span>
                                    {comments.length > 0
                                        ? comments.length
                                        : "Comment"}
                                </span>
                            </button>

                            {/* Save */}
                            <button
                                onClick={handleSave}
                                className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 text-sm ${saved
                                    ? "text-[#E0263A] bg-[#FCE8EA] font-medium"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                {saved ? (
                                    <FaHeart size={16} />
                                ) : (
                                    <IoMdHeartEmpty size={19} />
                                )}

                                <span>
                                    {saved
                                        ? "Saved"
                                        : "Save"}
                                </span>
                            </button>

                        </div>

                    </div>
                )}

            </div>

            {/* Comments */}
            {showComments && (
                <div className="mt-5 pt-5 border-t border-gray-100">

                    {/* Comment Input */}
                    <div className="flex items-center gap-2">

                        <input
                            type="text"
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            onKeyDown={
                                handleCommentKeyDown
                            }
                            placeholder="Write a comment..."
                            className="flex-1 min-w-0 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#4A7FA7] focus:ring-2 focus:ring-[#EAF3FB] transition"
                        />

                        <button
                            onClick={handleComment}
                            disabled={
                                comment.trim() === ""
                            }
                            aria-label="Send comment"
                            className="shrink-0 w-10 h-10 rounded-full bg-[#1A3D63] text-white flex items-center justify-center hover:bg-[#264F7E] disabled:opacity-40 disabled:hover:bg-[#1A3D63] transition-colors"
                        >
                            <IoSend size={16} />
                        </button>

                    </div>

                    {/* Comments List */}
                    <div className="mt-4 space-y-2.5">

                        {comments.map((c, index) => (
                            <div
                                key={index}
                                className="flex gap-3 bg-[#F7F9FB] rounded-2xl p-3 sm:p-3.5"
                            >

                                <div className="w-8 h-8 shrink-0 rounded-full bg-[#4A7FA7] text-white flex items-center justify-center text-xs font-semibold">
                                    {c.user
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#1A3D63] text-sm">
                                        {c.user}
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-0.5 break-words">
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