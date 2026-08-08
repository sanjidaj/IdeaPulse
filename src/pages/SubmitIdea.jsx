import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../services/api";
import toast from "react-hot-toast";

const SubmitIdea = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const editIdea = location.state?.editIdea;

  const [formData, setFormData] = useState({
    title: editIdea?.title || "",
    category: editIdea?.category || "",
    description: editIdea?.description || "",
    problem: editIdea?.problem || "",
    solution: editIdea?.solution || "",
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
      if (editIdea) {
        // Update existing idea
        await api.put(`/ideas/${editIdea._id}`, formData);

        toast.success("Idea updated successfully!");
      } else {
        // Create new idea
        const newIdea = {
          ...formData,
          userId: user.id,
          createdBy: user.name,
        };

        await api.post("/ideas", newIdea);

        toast.success("Idea submitted successfully!");
      }

      navigate("/my-ideas");
    } catch (error) {
      console.log(error);
      toast.error(
        editIdea ? "Failed to update idea" : "Failed to submit idea"
      );
    }
  };


  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7FA7]/40 focus:border-[#4A7FA7] transition-all duration-200";

  return (

    <div className="min-h-screen bg-[#F5F7FA] mx-auto flex justify-center px-4 py-10 sm:py-14">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3D63] tracking-tight">
            Submit Your Startup Idea
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Share your vision with the community — every great startup starts with an idea.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1A3D63] mb-1.5">
              Idea Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. AI-powered study planner"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3D63] mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
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
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3D63] mb-1.5">
              Short Description
            </label>
            <textarea
              name="description"
              placeholder="Give a quick overview of your idea"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3D63] mb-1.5">
              Problem
            </label>
            <textarea
              name="problem"
              placeholder="What problem does your idea solve?"
              rows="4"
              value={formData.problem}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3D63] mb-1.5">
              Solution
            </label>
            <textarea
              name="solution"
              placeholder="How does your solution solve the problem?"
              rows="4"
              value={formData.solution}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1A3D63] text-white font-medium py-3.5 rounded-xl shadow-sm hover:bg-[#4A7FA7] hover:shadow-md active:scale-[0.98] transition-all duration-200"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default SubmitIdea;