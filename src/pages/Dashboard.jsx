
import { useEffect, useState } from "react";
import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";

import { Lightbulb, ThumbsUp, Bookmark, Sparkles } from "lucide-react";

const TOKENS = {
    paper: "#F5F7FA",
    ink: "#1A3D63",
    signal: "#1A3D63",
    pulse: "#4A7FA7",
    moss: "#EF4444",
    line: "#E2E8F0",
    slate: "#6B7280",
};

const CATEGORY_COLORS = [
    "#1A3D63",
    "#4A7FA7",
    "#6FA8DC",
    "#9FC5E8",
    "#B3CFE5",
    "#D9EAF7",
    "#8CB4D9",
];

const ChartTooltip = ({ active, payload, label, unit = "" }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div
            style={{
                background: TOKENS.ink,
                color: TOKENS.paper,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                minWidth: 120,
                boxShadow: "0 8px 24px rgba(22,35,58,0.25)",
                pointerEvents: "none",
            }}
        >
            {label && (
                <div style={{ opacity: 0.65, marginBottom: 2 }}>
                    {label}
                </div>
            )}

            {payload.map((p, i) => (
                <div
                    key={i}
                    style={{
                        fontWeight: 600,
                    }}
                >
                    {p.name}: {p.value}
                    {unit}
                </div>
            ))}
        </div>
    );
};

const SectionCard = ({ title, eyebrow, children, className = "" }) => (
    <div
        className={`bg-white rounded-2xl p-6 ${className}`}
        style={{ border: `1px solid ${TOKENS.line}` }}
    >
        {eyebrow && (
            <p
                className="text-[11px] tracking-[0.14em] uppercase mb-1"
                style={{ color: TOKENS.slate }}
            >
                {eyebrow}
            </p>
        )}

        {title && (
            <h2
                className="text-lg font-semibold mb-5"
                style={{ color: TOKENS.ink }}
            >
                {title}
            </h2>
        )}

        {children}
    </div>
);

const EmptyState = ({ label }) => (
    <div
        className="flex flex-col items-center justify-center h-full py-16 text-center"
        style={{ color: TOKENS.slate }}
    >
        <Sparkles
            size={22}
            style={{
                color: TOKENS.signal,
                marginBottom: 8,
            }}
        />

        <p className="text-sm">{label}</p>
    </div>
);

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        ideas: 0,
        likes: 0,
        saved: 0,
    });

    const [categoryData, setCategoryData] = useState([]);
    const [likesData, setLikesData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);

                if (!user?.id) {
                    return;
                }

                const res = await api.get(`/dashboard/${user.id}`);

                setStats(res.data.stats || {
                    ideas: 0,
                    likes: 0,
                    saved: 0,
                });

                setCategoryData(res.data.categoryData || []);
                setLikesData(res.data.likesData || []);
                setMonthlyData(res.data.monthlyData || []);

            } catch (error) {
                console.log("Dashboard error:", error);

                setStats({
                    ideas: 0,
                    likes: 0,
                    saved: 0,
                });

                setCategoryData([]);
                setLikesData([]);
                setMonthlyData([]);

            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user?.id]);

    const totalCategoryIdeas = categoryData.reduce(
        (sum, c) => sum + (c.value || 0),
        0
    );

    const metricConfig = [
        {
            key: "ideas",
            label: "Total ideas",
            value: stats.ideas || 0,
            color: TOKENS.pulse,
            icon: Lightbulb,
        },
        {
            key: "likes",
            label: "Total likes",
            value: stats.likes || 0,
            color: "#22C55E",
            icon: ThumbsUp,
        },
        {
            key: "saved",
            label: "Total Saves",
            value: stats.saved || 0,
            color: TOKENS.moss,
            icon: Bookmark,
        },
    ];

    return (
        <div
            className="min-h-screen p-6 md:p-10"
            style={{
                background: "#F5F7FA",
                backgroundImage:
                    "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1
                        className="text-3xl md:text-4xl font-semibold"
                        style={{ color: TOKENS.ink }}
                    >
                        📈 Dashboard
                    </h1>
                </div>

                {/* Stats */}
                <div
                    className="relative bg-white rounded-2xl overflow-hidden"
                    style={{
                        border: `1px solid ${TOKENS.line}`,
                    }}
                >
                    <div
                        className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x text-gray-200"
                        style={{ borderColor: TOKENS.line }}
                    >
                        {metricConfig.map(
                            ({
                                key,
                                label,
                                value,
                                color,
                                icon: Icon,
                            }) => (
                                <div
                                    key={key}
                                    className="relative p-6 md:p-7"
                                >
                                    <div className="flex items-center justify-between mb-3">

                                        <span
                                            className="flex items-center justify-center rounded-full"
                                            style={{
                                                width: 40,
                                                height: 40,
                                                background: `${color}1A`,
                                                color,
                                            }}
                                        >
                                            <Icon
                                                size={18}
                                                strokeWidth={2.25}
                                            />
                                        </span>

                                        <span
                                            className="w-2 h-2 rounded-full hidden md:block mb-4"
                                            style={{
                                                background: color,
                                            }}
                                        />
                                    </div>

                                    <p
                                        className="text-3xl font-semibold text-center"
                                        style={{ color }}
                                    >
                                        {loading ? "–" : value}
                                    </p>

                                    <p
                                        className="text-sm mt-1 text-center"
                                        style={{
                                            color: TOKENS.slate,
                                        }}
                                    >
                                        {label}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Ideas by category */}
                <SectionCard
                    eyebrow="Breakdown"
                    title="Ideas by category"
                    className="mt-6"
                >
                    {categoryData.length === 0 && !loading ? (
                        <EmptyState
                            label="Categorize an idea to see the split."
                        />
                    ) : (
                        <div className="relative">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={78}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        stroke="none"
                                    >
                                        {categoryData.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        CATEGORY_COLORS[
                                                            index %
                                                                CATEGORY_COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>

                                    <Tooltip
                                        content={
                                            <ChartTooltip />
                                        }
                                        isAnimationActive={false}
                                        wrapperStyle={{
                                            outline: "none",
                                            pointerEvents: "none",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                style={{ top: -8 }}
                            >
                                <span
                                    className="text-3xl font-semibold"
                                    style={{
                                        color: TOKENS.ink,
                                    }}
                                >
                                    {totalCategoryIdeas}
                                </span>

                                <span
                                    className="text-xs"
                                    style={{
                                        color: TOKENS.slate,
                                    }}
                                >
                                    ideas total
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 justify-center">

                                {categoryData.map((c, i) => (
                                    <div
                                        key={c.name}
                                        className="flex items-center gap-1.5 text-xs"
                                        style={{
                                            color: TOKENS.slate,
                                        }}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                                background:
                                                    CATEGORY_COLORS[
                                                        i %
                                                            CATEGORY_COLORS.length
                                                    ],
                                            }}
                                        />

                                        {c.name}
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}
                </SectionCard>

                {/* Likes per idea */}
                <SectionCard
                    eyebrow="Performance"
                    title="Likes per idea"
                    className="mt-6"
                >
                    {likesData.length === 0 && !loading ? (
                        <EmptyState
                            label="Likes will show up here once ideas get votes."
                        />
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <BarChart
                                data={likesData}
                                layout="vertical"
                                margin={{
                                    left: 8,
                                    right: 16,
                                }}
                            >
                                <CartesianGrid
                                    horizontal={false}
                                    stroke={TOKENS.line}
                                />

                                <XAxis
                                    type="number"
                                    tick={{
                                        fontSize: 11,
                                        fill: TOKENS.slate,
                                    }}
                                    axisLine={{
                                        stroke: TOKENS.line,
                                    }}
                                    tickLine={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="title"
                                    width={110}
                                    tick={{
                                        fontSize: 12,
                                        fill: TOKENS.ink,
                                    }}
                                    axisLine={{
                                        stroke: TOKENS.line,
                                    }}
                                    tickLine={false}
                                />

                                <Tooltip
                                    content={
                                        <ChartTooltip unit=" likes" />
                                    }
                                    cursor={{
                                        fill: "#F5F1E8",
                                    }}
                                    isAnimationActive={false}
                                    wrapperStyle={{
                                        outline: "none",
                                        pointerEvents: "none",
                                    }}
                                />

                                <Bar
                                    dataKey="likes"
                                    fill={TOKENS.pulse}
                                    radius={[
                                        0,
                                        6,
                                        6,
                                        0,
                                    ]}
                                    barSize={16}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </SectionCard>

                {/* Monthly trend */}
                <SectionCard
                    eyebrow="Momentum"
                    title="Monthly ideas"
                    className="mt-6"
                >
                    {monthlyData.length === 0 && !loading ? (
                        <EmptyState
                            label="Add ideas over time to see your trend."
                        />
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height={280}
                        >
                            <AreaChart data={monthlyData}>

                                <defs>
                                    <linearGradient
                                        id="ideaGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor={TOKENS.signal}
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor={TOKENS.signal}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    vertical={false}
                                    stroke={TOKENS.line}
                                />

                                <XAxis
                                    dataKey="month"
                                    tick={{
                                        fontSize: 12,
                                        fill: TOKENS.slate,
                                    }}
                                    axisLine={{
                                        stroke: TOKENS.line,
                                    }}
                                    tickLine={false}
                                />

                                <YAxis
                                    tick={{
                                        fontSize: 11,
                                        fill: TOKENS.slate,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={30}
                                />

                                <Tooltip
                                    content={
                                        <ChartTooltip unit=" ideas" />
                                    }
                                    isAnimationActive={false}
                                    wrapperStyle={{
                                        outline: "none",
                                        pointerEvents: "none",
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="ideas"
                                    stroke={TOKENS.signal}
                                    strokeWidth={2.5}
                                    fill="url(#ideaGradient)"
                                    dot={{
                                        r: 3.5,
                                        fill: TOKENS.signal,
                                        strokeWidth: 0,
                                    }}
                                    activeDot={{ r: 5 }}
                                />

                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </SectionCard>

            </div>
        </div>
    );
};

export default Dashboard;

