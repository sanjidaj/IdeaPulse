import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1A3D63",
  "#4A7FA7",
  "#6FA8DC",
  "#8CB4D9",
  "#9FC5E8",
  "#B3CFE5",
  "#D9EAF7",
];

const CategoryPieChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-semibold text-[#1A3D63] mb-6">
        Ideas by Category
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default CategoryPieChart;