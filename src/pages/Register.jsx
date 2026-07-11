import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../services/api";
import LogoText from "../assets/logoText.png"

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 space-y-4"
      >
        <div className="flex justify-center">
                   
           <img src={LogoText} alt="Logo"
           className="h-10" />
                    
        </div>
        <h2 className="text-[#1A3D63] text-2xl font-semibold text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded border border-[#4A7FA7]/20"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded border border-[#4A7FA7]/20"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded border border-[#4A7FA7]/20"
        />

        <button className="w-full bg-[#4A7FA7] py-3 rounded text-white font-bold">
          Register
        </button>

        <p className="text-gray-500 text-sm text-center">
          Already have an account?
          <Link className="text-[#1A3D63]" to="/login">
            {" "}Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;