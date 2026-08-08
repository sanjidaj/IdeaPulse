import { useState } from "react";
import {
    FaUser, FaLock, FaBell, FaShieldAlt, FaInfoCircle, FaTrashAlt,
    FaChevronRight,FaHeart, FaComment, FaBookmark,
     FaGlobe, FaEnvelope, FaEye, FaExclamationTriangle,
    FaMobileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../services/api";

// Moved outside — stable component references across renders
const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-1">
            <span className="w-9 h-9 rounded-xl bg-[#EAF3FB] flex items-center justify-center text-[#4A7FA7] text-sm shrink-0">
                {icon}
            </span>
            <h2 className="font-bold text-[#1A3D63] text-base">
                {title}
            </h2>
        </div>
        {subtitle && (
            <p className="text-xs text-gray-400 ml-[48px] mb-3">
                {subtitle}
            </p>
        )}
        <div className={subtitle ? "mt-2" : "mt-4"}>
            {children}
        </div>
    </div>
);

const NavRow = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-2 px-5 rounded-xl hover:bg-gray-50 transition"
    >
        <div className="flex items-center gap-3 text-sm text-gray-700">
            <span className="text-[#4A7FA7]">{icon}</span>
            {label}
        </div>
        <FaChevronRight className="text-gray-300" size={12} />
    </button>
);

const ToggleRow = ({ icon, label, checked, onChange }) => (
    <label className="flex justify-between items-center py-2 px-5 rounded-xl cursor-pointer hover:bg-gray-50 transition group">
        <div className="flex items-center gap-3">
            <span className=" flex items-center justify-center text-[#4A7FA7] text-sm">
                {icon}
            </span>
            <span className="text-sm text-gray-700 group-hover:text-[#1A3D63] transition-colors">
                {label}
            </span>
        </div>

        <div className="relative shrink-0">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#1A3D63] transition-colors duration-300" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
        </div>
    </label>
);

const notificationMeta = {
    likes: { label: "Notify when someone likes my idea", icon: <FaHeart /> },
    comments: { label: "Notify when someone comments", icon: <FaComment /> },
    saves: { label: "Notify when someone saves my idea", icon: <FaBookmark /> },
};

const privacyMeta = {
    profile: { label: "Public Profile", icon: <FaGlobe /> },
    email: { label: "Show My Email", icon: <FaEnvelope /> },
    visibility: { label: "Allow Others to View My Profile", icon: <FaEye /> },
};

const Settings = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState({
        likes: true,
        comments: true,
        saves: true,
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
                <div className="mb-8 flex items-center gap-4">
                    
                    <div>
                        <h1 className="text-3xl sm:text-3xl font-bold text-[#1A3D63]">
                            ⚙️ Settings
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Manage your account preferences and application settings.
                        </p>
                    </div>
                </div>

                {/* Account */}
                <SectionCard icon={<FaUser />} title="Account">
                    <div className="divide-y divide-gray-100">
                        <NavRow
                            icon={<FaUser size={14} />}
                            label="Edit Profile"
                            onClick={() => navigate("/profile")}
                        />
                        <NavRow
                            icon={<FaLock size={14} />}
                            label="Change Password"
                            onClick={() => navigate("/profile")}
                        />
                    </div>
                </SectionCard>

                {/* Notifications */}
                <SectionCard
                    icon={<FaBell />}
                    title="Notifications"
                    subtitle="Choose what you want to be notified about"
                >
                    <div className="divide-y divide-gray-100">
                        {Object.entries(notifications).map(([key, value]) => (
                            <ToggleRow
                                key={key}
                                icon={notificationMeta[key]?.icon}
                                label={notificationMeta[key]?.label}
                                checked={value}
                                onChange={() =>
                                    setNotifications({
                                        ...notifications,
                                        [key]: !notifications[key],
                                    })
                                }
                            />
                        ))}
                    </div>
                </SectionCard>

                {/* Privacy */}
                <SectionCard
                    icon={<FaShieldAlt />}
                    title="Privacy"
                    subtitle="Control who can see your information"
                >
                    <div className="divide-y divide-gray-100">
                        {Object.entries(privacy).map(([key, value]) => (
                            <ToggleRow
                                key={key}
                                icon={privacyMeta[key]?.icon}
                                label={privacyMeta[key]?.label}
                                checked={value}
                                onChange={() =>
                                    setPrivacy({
                                        ...privacy,
                                        [key]: !privacy[key],
                                    })
                                }
                            />
                        ))}
                    </div>
                </SectionCard>

                {/* About */}
                <SectionCard icon={<FaInfoCircle />} title="About">
                    <div className="divide-y divide-gray-100 text-sm">
                        <p className="mb-2 py-1 px-2  text-gray-400 flex items-center gap-2">
                            <FaMobileAlt className="text-gray-400" size={12} />
                            Version 1.0.0
                        </p>
                        <p className="py-2 px-5 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-[#1A3D63] transition flex items-center justify-between">
                            Privacy Policy
                            <FaChevronRight className="text-gray-300" size={11} />
                        </p>
                        <p className="py-2 px-5 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-[#1A3D63] transition flex items-center justify-between">
                            Terms &amp; Conditions
                            <FaChevronRight className="text-gray-300" size={11} />
                        </p>
                        <p className="py-2 px-5 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-[#1A3D63] transition flex items-center justify-between">
                            Contact Support
                            <FaChevronRight className="text-gray-300" size={11} />
                        </p>
                    </div>
                </SectionCard>

                {/* Danger Zone */}
                <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                            <FaExclamationTriangle size={15} />
                        </span>
                        <div className="flex-1">
                            <h2 className="font-bold text-red-600 text-base">
                                Danger Zone
                            </h2>
                            <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">
                                Deleting your account will permanently remove all your
                                ideas, comments, likes and saved ideas.
                            </p>

                            <button
                                onClick={handleDelete}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition-colors text-sm font-medium flex items-center gap-2"
                            >
                                <FaTrashAlt size={12} />
                                Delete My Account
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;