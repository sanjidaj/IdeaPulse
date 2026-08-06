const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#1A3D63]">
            {value}
          </h2>
        </div>

        <div className={`text-4xl ${color}`}>
          {icon}
        </div>

      </div>
    </div>
  );
};

export default SummaryCard;