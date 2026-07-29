import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import toast from "react-hot-toast";

const SubmitIdea = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
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
      const newIdea = {
        ...formData,
        createdBy: user.name,
      };

      await api.post("/ideas", newIdea);

      toast.success("Idea submitted successfully!");

      navigate("/homepage");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit idea");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-[#1A3D63] text-center">
          Submit Your Startup Idea
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Idea Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        >
          <option value="">Select Category</option>
          <option>AI</option>
          <option>Education</option>
          <option>Healthcare</option>
          <option>Environment</option>
          <option>Finance</option>
          <option>E-commerce</option>
          <option>Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Short Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        />

        <textarea
          name="problem"
          placeholder="What problem does your idea solve?"
          rows="4"
          value={formData.problem}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        />

        <textarea
          name="solution"
          placeholder="How does your solution solve the problem?"
          rows="4"
          value={formData.solution}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1A3D63] text-white py-3 rounded-xl hover:bg-[#4A7FA7] transition"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default SubmitIdea;