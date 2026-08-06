import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const LikesBarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-semibold text-[#1A3D63] mb-6">
        Likes Per Idea
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="title" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="likes"
            fill="#1A3D63"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default LikesBarChart;