import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FaLightbulb, FaRegHeart, FaThumbsUp, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const [stats, setStats] = useState({
    ideas: 0,
    saved: 0,
    likes: 0,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get(`/users/profile/${user.id}`);

        setStats(res.data.stats);

        setProfile({
          name: res.data.user.name,
          email: res.data.user.email,
          password: "",
        });

      } catch (error) {
        console.log(error);
      }
    }

    loadProfile();
  }, [user.id]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {

      const res = await api.put(`/users/profile/${user.id}`, profile);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Profile Updated");

    } catch (error) {

      console.log(error);
      toast.error("Update Failed");

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

          {/* Identity header */}
          <div className="bg-gradient-to-r from-[#1A3D63] to-[#2C5789] rounded-2xl px-8 py-8">
            <div className="flex items-center gap-5">
              <div className="flex w-20 h-20 items-center justify-center rounded-full bg-linear-to-br from-[#1A3D63] to-[#4A7FA7] text-3xl font-bold text-white ring-2 ring-[#4A7FA7]/20 transition-all duration-300 ">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-white truncate">
                  {profile.name}
                </h1>

                <p className="text-white/70 truncate">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-8 pt-6">
            <div className="grid grid-cols-3 gap-4">

              <div className="bg-[#F9FAFB] rounded-xl border border-gray-100 p-5 text-center">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A3D63]/10 text-[#1A3D63]">
                  <FaLightbulb className="text-sm" />
                </div>
                <h2 className="text-2xl font-bold text-[#1A3D63]">
                  {stats.ideas}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Ideas Shared</p>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl border border-gray-100 p-5 text-center">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <FaRegHeart className="text-sm" />
                </div>
                <h2 className="text-2xl font-bold text-red-500">
                  {stats.saved}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Saved Ideas</p>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl border border-gray-100 p-5 text-center">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <FaThumbsUp className="text-sm" />
                </div>
                <h2 className="text-2xl font-bold text-green-600">
                  {stats.likes}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Total Likes</p>
              </div>

            </div>
          </div>

          {/* Edit form */}
          <div className="px-8 pb-8 pt-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-5">
              Edit Profile
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-[#1A3D63] focus:bg-white focus:ring-2 focus:ring-[#1A3D63]/15"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-[#1A3D63] focus:bg-white focus:ring-2 focus:ring-[#1A3D63]/15"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-[#1A3D63] focus:bg-white focus:ring-2 focus:ring-[#1A3D63]/15"
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    placeholder="Change Password"
                  />
                </div>
              </div>

              <button
                disabled={saving}
                className="w-full rounded-xl bg-[#1A3D63] hover:bg-[#2C5789] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 text-sm transition-colors duration-150 mt-2"
              >
                {saving ? "Updating..." : "Update Profile"}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;