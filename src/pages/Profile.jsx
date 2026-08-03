import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const [stats, setStats] =useState({
    ideas:0,
    saved:0,
    likes:0,
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get(`/users/profile/${user.id}`);

        setStats(res.data.stats);

        setProfile({
          name: res.data.user.name,
          email: res.data.user.email,
          password:"",
        });

      } catch (error) {
        console.log(error);
      }
    }

    loadProfile();
  }, [user.id]);

  const handleChange=(e)=>{
    setProfile({
      ...profile,
      [e.target.name]:e.target.value,
    });
  };

  const handleUpdate=async(e)=>{
    e.preventDefault();

    try{

      const res=await api.put(`/users/profile/${user.id}`,profile);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Profile Updated");

    }catch(error){

      console.log(error);
      toast.error("Update Failed");

    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-[#1A3D63] text-white flex items-center justify-center text-4xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1A3D63]">
              {profile.name}
            </h1>

            <p className="text-gray-500">
              {profile.email}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-5 mt-10">

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-[#1A3D63]">
              {stats.ideas}
            </h2>

            <p>Ideas Shared</p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-red-500">
              {stats.saved}
            </h2>

            <p>Saved Ideas</p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-green-600">
              {stats.likes}
            </h2>

            <p>Total Likes</p>
          </div>

        </div>

        <form
          onSubmit={handleUpdate}
          className="mt-10 space-y-5"
        >

          <input
            className="input input-bordered w-full"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            className="input input-bordered w-full"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            className="input input-bordered w-full"
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />

          <button className="btn bg-[#1A3D63] hover:bg-[#4A7FA7] text-white w-full">
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
};

export default Profile;