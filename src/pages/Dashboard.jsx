import { useEffect, useState } from "react";
import api from "../services/api";

import SummaryCard from "../components/SummaryCard";
import CategoryPieChart from "../components/CategoryPieChart";
import LikesBarChart from "../components/LikesBarChart";
import MonthlyLineChart from "../components/MonthlyLineChart";

import {
  FaLightbulb,
  FaHeart,
  FaThumbsUp,
} from "react-icons/fa";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    ideas: 0,
    likes: 0,
    saved: 0,
  });

  const [categoryData, setCategoryData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get(`/dashboard/${user.id}`);

        setStats(res.data.stats);
        setCategoryData(res.data.categoryData);
        setLikesData(res.data.likesData);
        setMonthlyData(res.data.monthlyData);
        
      } catch (error) {
        console.log(error);
      }
    };

    loadDashboard();
  }, [user.id]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#1A3D63] mb-8">
          Dashboard
        </h1>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <SummaryCard
            title="Ideas Shared"
            value={stats.ideas}
            icon={<FaLightbulb />}
            color="text-[#1A3D63]"
          />

          <SummaryCard
            title="Total Likes"
            value={stats.likes}
            icon={<FaThumbsUp />}
            color="text-green-600"
          />

          <SummaryCard
            title="Total Saves"
            value={stats.saved}
            icon={<FaHeart />}
            color="text-red-500"
          />

        </div>

        {/* Pie + Bar */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <CategoryPieChart
            data={categoryData}
          />

          <LikesBarChart
            data={likesData}
          />

        </div>

        {/* Line */}

        <div className="mt-10">

          <MonthlyLineChart
            data={monthlyData}
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;