
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import LogoText from "../assets/logoText.png"
import toast from "react-hot-toast";
// import logoImg from "../assets/logo.png"



const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const res = await api.post("/auth/login", formData);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login successful!");

      navigate("/homepage");

    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className=" flex items-center justify-center ">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 space-y-4"
      >
        <div className="flex justify-center">
            {/* <img src={logoImg} alt="Logo"
            className="h-12 " /> */}
            <img src={LogoText} alt="Logo"
            className="h-10" />
            
        </div>
        <h2 className="text-[#1A3D63] text-2xl font-semibold text-center">
          Login
        </h2>

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
          Login
        </button>

        <p className="text-gray-500 text-sm text-center">
          Don't have an account?
          <Link className="text-[#1A3D63]" to="/register">
            {" "}Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;