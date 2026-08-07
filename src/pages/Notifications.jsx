import { useEffect, useState } from "react";
import api from "../services/api";
import {
    FaHeart,
    FaBookmark,
    FaComment,
    FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const Notifications = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await api.get(
                    `/notifications/${user.id}`
                );

                setNotifications(res.data.notifications);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user.id]);

    const handleNotificationClick = async (notification) => {
        try {
            // Mark as read only if unread
            if (!notification.read) {
                await api.put(
                    `/notifications/${notification._id}/read`
                );

                // Immediately remove unread indicator
                setNotifications((prev) =>
                    prev.map((item) =>
                        item._id === notification._id
                            ? { ...item, read: true }
                            : item
                    )
                );
            }

            // Open the related idea
            navigate(`/idea/${notification.ideaId._id}`, {
                state: {
                    openComments: notification.type === "comment",
                },
            });

        } catch (error) {
            console.log(error);
        }
    };


    const getIcon = (type) => {
        if (type === "like") {
            return (
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <FaHeart size={15} />
                </div>
            );
        }

        if (type === "save") {
            return (
                <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                    <FaBookmark size={15} />
                </div>
            );
        }

        if (type === "comment") {
            return (
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4A7FA7] flex items-center justify-center">
                    <FaComment size={15} />
                </div>
            );
        }

        return (
            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                <FaBell size={15} />
            </div>
        );
    };

    const formatTime = (date) => {
        const notificationDate = new Date(date);
        const now = new Date();

        const seconds = Math.floor(
            (now - notificationDate) / 1000
        );

        if (seconds < 60) {
            return "Just now";
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return `${minutes}m ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours}h ago`;
        }

        const days = Math.floor(hours / 24);

        if (days < 7) {
            return `${days}d ago`;
        }

        return notificationDate.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <p className="text-gray-500">
                            Loading notifications...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 sm:px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3D63]">
                        Notifications
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Stay updated with activity on your ideas.
                    </p>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    {notifications.length === 0 ? (
                        <div className="py-16 px-6 text-center">

                            <div className="mx-auto w-14 h-14 rounded-full bg-[#EAF3FB] text-[#4A7FA7] flex items-center justify-center mb-4">
                                <FaBell size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-[#1A3D63]">
                                No notifications yet
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                When someone interacts with your ideas,
                                you'll see it here.
                            </p>

                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors hover:bg-[#F8FBFD] ${!notification.read
                                        ? "bg-[#F8FBFD]"
                                        : "bg-white"
                                    }`}
                            >
                                {/* Icon */}
                                {getIcon(notification.type)}

                                {/* Content */}
                                <div className="flex-1 min-w-0">

                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-[#1A3D63]">
                                            {notification.sender?.name}
                                        </span>{" "}
                                        {notification.type === "like" &&
                                            "liked your idea"}

                                        {notification.type === "save" &&
                                            "saved your idea"}

                                        {notification.type === "comment" &&
                                            "commented on your idea"}
                                    </p>

                                    {notification.ideaId?.title && (
                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            "{notification.ideaId.title}"
                                        </p>
                                    )}

                                    <p className="text-xs text-gray-400 mt-1">
                                        {formatTime(
                                            notification.createdAt
                                        )}
                                    </p>

                                </div>

                                {/* Unread indicator */}
                                {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-[#4A7FA7] shrink-0" />
                                )}
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    );
};

export default Notifications;