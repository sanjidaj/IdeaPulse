import { useEffect, useState } from "react";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const MyIdeas = () => {
    const [ideas, setIdeas] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchMyIdeas = async () => {
            try {
                const res = await api.get(`/ideas/my-ideas/${user.id}`);
                setIdeas(res.data.ideas);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyIdeas();
    }, [user.name]);

    const handleEdit = (idea) => {
        navigate("/submit-idea", {
            state: {
                editIdea: idea,
            },
        });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete this idea?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#1A3D63",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/ideas/${id}`);

            setIdeas((prev) =>
                prev.filter((idea) => idea._id !== id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your idea has been deleted successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to delete the idea.",
            });
        }
    };


    return (
        <div className="min-h-screen bg-[#F5F7FA] mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3D63] tracking-tight">
                            📝 My Ideas
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm sm:text-base">
                            {ideas.length > 0
                                ? `${ideas.length} idea${ideas.length > 1 ? "s" : ""} shared with the community`
                                : "Ideas you've submitted will show up here"}
                        </p>
                    </div>

                    {ideas.length > 0 && (
                        <button
                            onClick={() => navigate("/submit-idea")}
                            className="hidden sm:inline-flex bg-[#1A3D63] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#4A7FA7] hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-3"
                        >
                            <FaPlus /> New Idea
                        </button>
                    )}
                </div>

                {ideas.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 sm:p-14 text-center">
                        <div className="text-4xl mb-3">💡</div>

                        <h2 className="text-xl font-semibold text-[#1A3D63] tracking-tight">
                            No ideas yet
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            You haven't submitted any ideas yet.
                        </p>

                        <button
                            onClick={() => navigate("/submit-idea")}
                            className="mt-6 bg-[#1A3D63] text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:bg-[#4A7FA7] hover:shadow-md active:scale-95 transition-all duration-200"
                        >
                            Submit Your First Idea
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="transition-transform duration-200 hover:-translate-y-0.5"
                            >
                                <IdeaCard
                                    key={idea._id}
                                    idea={idea}
                                    showActions={true}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIdeas;