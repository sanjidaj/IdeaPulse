import { useState } from "react";
import {
    FaUser,
    FaLock,
    FaBell,
    FaShieldAlt,
    FaInfoCircle,
    FaTrashAlt,
    FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../services/api";

const Settings = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState({
        likes: true,
        comments: true,
        saves: true,
        weekly: false,
    });

    const [privacy, setPrivacy] = useState({
        profile: true,
        email: false,
        visibility: true,
    });


    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const result = await Swal.fire({
            title: "Delete Account?",
            html: `
      <p style="margin-bottom:10px">
        This action is <b>permanent</b>.
      </p>
      <ul style="text-align:left">
        <li>• Your profile will be deleted</li>
        <li>• All your ideas will be removed</li>
        <li>• Your likes, comments and saves will be removed</li>
      </ul>
    `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete Account",
            cancelButtonText: "Keep Account",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/users/${user.id}`);

            localStorage.removeItem("user");

            toast.success("Your account has been deleted.");

            navigate("/");

        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A3D63]">
                        ⚙️ Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account preferences and application settings.
                    </p>
                </div>

                {/* Account */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                    <h2 className="font-bold text-[#1A3D63] text-lg mb-5 flex items-center gap-2">
                        <FaUser />
                        Account
                    </h2>

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center gap-3">
                            <FaUser />
                            Edit Profile
                        </div>
                        <FaChevronRight />
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center gap-3">
                            <FaLock />
                            Change Password
                        </div>
                        <FaChevronRight />
                    </button>

                    
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                    <h2 className="font-bold text-[#1A3D63] text-lg mb-5 flex items-center gap-2">
                        <FaBell />
                        Notifications
                    </h2>

                    {[
                        ["likes", "Notify when someone likes my idea"],
                        ["comments", "Notify when someone comments"],
                        ["saves", "Notify when someone saves my idea"],
                        ["weekly", "Weekly activity summary"],
                    ].map(([key, label]) => (
                        <label
                            key={key}
                            className="flex justify-between items-center py-3 cursor-pointer"
                        >
                            <span>{label}</span>

                            <input
                                type="checkbox"
                                checked={notifications[key]}
                                onChange={() =>
                                    setNotifications({
                                        ...notifications,
                                        [key]: !notifications[key],
                                    })
                                }
                                className="toggle toggle-primary"
                            />
                        </label>
                    ))}
                </div>



                {/* Privacy */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                    <h2 className="font-bold text-[#1A3D63] text-lg mb-5 flex items-center gap-2">
                        <FaShieldAlt />
                        Privacy
                    </h2>

                    {[
                        ["profile", "Public Profile"],
                        ["email", "Show My Email"],
                        ["visibility", "Allow Others to View My Profile"],
                    ].map(([key, label]) => (
                        <label
                            key={key}
                            className="flex justify-between items-center py-3 cursor-pointer"
                        >
                            <span>{label}</span>

                            <input
                                type="checkbox"
                                checked={privacy[key]}
                                onChange={() =>
                                    setPrivacy({
                                        ...privacy,
                                        [key]: !privacy[key],
                                    })
                                }
                                className="toggle toggle-primary"
                            />
                        </label>
                    ))}
                </div>

                {/* About */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                    <h2 className="font-bold text-[#1A3D63] text-lg mb-5 flex items-center gap-2">
                        <FaInfoCircle />
                        About
                    </h2>

                    <div className="space-y-3 text-gray-700">
                        <p>📱 Version 1.0.0</p>
                        <p className="cursor-pointer hover:text-[#1A3D63]">
                            Privacy Policy
                        </p>
                        <p className="cursor-pointer hover:text-[#1A3D63]">
                            Terms & Conditions
                        </p>
                        <p className="cursor-pointer hover:text-[#1A3D63]">
                            Contact Support
                        </p>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h2 className="font-bold text-red-600 text-lg flex items-center gap-2">
                        <FaTrashAlt />
                        Danger Zone
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Deleting your account will permanently remove all your
                        ideas, comments, likes and saved ideas.
                    </p>

                    <button
                        onClick={handleDelete}
                        className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
                    >
                        Delete My Account
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;