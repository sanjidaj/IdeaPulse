import { useEffect, useState } from "react";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";

const MyIdeas = () => {
    const [ideas, setIdeas] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchMyIdeas = async () => {
            try {
                const res = await api.get(`/ideas/my/${user.name}`);
                setIdeas(res.data.ideas);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyIdeas();
    }, [user.name]);

    return (
        <div className="p-8 bg-[#F5F7FA] min-h-screen">
            <h1 className="text-3xl font-bold text-[#1A3D63] mb-6">
                My Ideas
            </h1>

            {ideas.length === 0 ? (
                <p className="text-gray-500">
                    You haven't submitted any ideas yet.
                </p>
            ) : (
                ideas.map((idea) => (
                    <IdeaCard
                        key={idea._id}
                        idea={idea}
                        showActions={true}
                    />
                ))
            )}
        </div>
    );
};

export default MyIdeas;