import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useMobile, useReducedMotion } from "@/hooks/use-mobile";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";

export default function Analytics() {
  const { isMobile, isTablet } = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Bar chart data with gradients
  const monthlyRevenueData = [
    { month: "Jan", revenue: 45000, orders: 320, customers: 89 },
    { month: "Feb", revenue: 52000, orders: 380, customers: 102 },
    { month: "Mar", revenue: 48000, orders: 340, customers: 95 },
    { month: "Apr", revenue: 61000, orders: 420, customers: 118 },
    { month: "May", revenue: 55000, orders: 390, customers: 108 },
    { month: "Jun", revenue: 67000, orders: 480, customers: 135 },
    { month: "Jul", revenue: 72000, orders: 520, customers: 148 },
    { month: "Aug", revenue: 69000, orders: 490, customers: 140 },
  ];

  // Category performance data
  const categoryData = [
    { category: "Electronics", sales: 45000, growth: 12.5, color: "#8b5cf6" },
    { category: "Fashion", sales: 38000, growth: 8.2, color: "#06b6d4" },
    { category: "Home & Garden", sales: 29000, growth: 15.3, color: "#10b981" },
    { category: "Sports", sales: 22000, growth: -2.1, color: "#f59e0b" },
    { category: "Books", sales: 18000, growth: 5.7, color: "#ef4444" },
    { category: "Health", sales: 25000, growth: 18.9, color: "#8b5cf6" },
  ];

  // Traffic sources data
  const trafficData = [
    { name: "Organic Search", value: 45, color: "#8b5cf6" },
    { name: "Direct", value: 25, color: "#06b6d4" },
    { name: "Social Media", value: 15, color: "#10b981" },
    { name: "Email", value: 10, color: "#f59e0b" },
    { name: "Paid Ads", value: 5, color: "#ef4444" },
  ];

  // Performance metrics data
  const performanceData = [
    { metric: "Conversion Rate", value: 85, target: 90, color: "#8b5cf6" },
    {
      metric: "Customer Satisfaction",
      value: 92,
      target: 95,
      color: "#10b981",
    },
    { metric: "Page Load Speed", value: 78, target: 85, color: "#06b6d4" },
    { metric: "Mobile Optimization", value: 96, target: 98, color: "#f59e0b" },
  ];

  // Hourly data for line chart
  const hourlyData = [
    { hour: "00", users: 245, revenue: 1200 },
    { hour: "03", users: 189, revenue: 950 },
    { hour: "06", users: 378, revenue: 1890 },
    { hour: "09", users: 567, revenue: 2835 },
    { hour: "12", users: 892, revenue: 4460 },
    { hour: "15", users: 1024, revenue: 5120 },
    { hour: "18", users: 756, revenue: 3780 },
    { hour: "21", users: 445, revenue: 2225 },
  ];

  const gradientOffsets = [
    { id: "purpleGradient", colors: ["#8b5cf6", "#6366f1"] },
    { id: "blueGradient", colors: ["#06b6d4", "#0891b2"] },
    { id: "greenGradient", colors: ["#10b981", "#059669"] },
    { id: "orangeGradient", colors: ["#f59e0b", "#d97706"] },
    { id: "redGradient", colors: ["#ef4444", "#dc2626"] },
  ];

  return (
    <ResponsiveLayout
      className="dashboard-page"
      style={{
        background:
          "linear-gradient(135deg, #f0f0f0 0%, #f5f5f5 50%, #ebebeb 100%)",
      }}
    >
      <div>
        {/* Header */}
        <motion.header
          className={`${isMobile ? "mb-4" : "mb-8"}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
        >
          <div
            className={`flex items-center justify-between ${isMobile ? "flex-col gap-4" : ""}`}
          >
            <div className={isMobile ? "text-center" : ""}>
              <h1
                className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dashboard-title`}
              >
                Analytics Dashboard
              </h1>
              <p
                className={`text-gray-600 mt-1 dashboard-text ${isMobile ? "text-sm" : ""}`}
              >
                Comprehensive insights and performance metrics for your business
              </p>
            </div>
            <div
              className={`flex items-center ${isMobile ? "flex-col" : "flex-row"} gap-4`}
            >
              <div
                className={`flex bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/30 ${isMobile ? "text-sm" : ""}`}
              >
                {["7d", "30d", "90d", "1y"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`${isMobile ? "px-2 py-1" : "px-3 py-2"} rounded-xl text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? "bg-purple-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <Button
                size={isMobile ? "sm" : "sm"}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Key Metrics Cards */}
        <motion.div
          className={`grid ${isMobile ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-4 gap-6"} ${isMobile ? "mb-4" : "mb-8"}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5, delay: 0.1 }}
        >
          {[
            {
              title: "Total Revenue",
              value: "$487,239",
              change: "+12.5%",
              trending: "up",
              color: "purple",
            },
            {
              title: "Active Users",
              value: "24,568",
              change: "+8.2%",
              trending: "up",
              color: "blue",
            },
            {
              title: "Conversion Rate",
              value: "3.24%",
              change: "-0.3%",
              trending: "down",
              color: "green",
            },
            {
              title: "Avg. Order Value",
              value: "$89.50",
              change: "+5.1%",
              trending: "up",
              color: "orange",
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} border border-white/30`}
              whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-4"}`}
              >
                <div
                  className={`${isMobile ? "p-2" : "p-3"} rounded-2xl bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100`}
                >
                  {metric.trending === "up" ? (
                    <TrendingUp
                      className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-${metric.color}-600`}
                    />
                  ) : (
                    <TrendingDown
                      className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-${metric.color}-600`}
                    />
                  )}
                </div>
                <span
                  className={`${isMobile ? "text-xs" : "text-sm"} font-medium px-2 py-1 rounded-full ${
                    metric.trending === "up"
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3
                className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-600 mb-1`}
              >
                {metric.title}
              </h3>
              <p
                className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-gray-900`}
              >
                {metric.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div
          className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 lg:grid-cols-2 gap-6"} ${isMobile ? "mb-4" : "mb-8"}`}
        >
          {/* Monthly Revenue Bar Chart */}
          <motion.div
            className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} shadow-lg border border-white/30`}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
            animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion ? {} : { duration: 0.6, delay: 0.2 }
            }
          >
            <div
              className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}
            >
              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}
              >
                Monthly Revenue
              </h3>
              <BarChart3
                className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-purple-600`}
              />
            </div>
            <div className={`${isMobile ? "h-60" : "h-80"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenueData}
                  margin={{
                    top: 20,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 10 : 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="revenueBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#c4b5fd"
                        stopOpacity={0.7}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                    axisLine={true}
                    tickLine={true}
                    type="category"
                  />
                  <YAxis
                    tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                    axisLine={true}
                    tickLine={true}
                    type="number"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#revenueBar)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Performance */}
          <motion.div
            className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} shadow-lg border border-white/30`}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
            animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3 }
            }
          >
            <div
              className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}
            >
              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}
              >
                Category Performance
              </h3>
              <Activity
                className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-blue-600`}
              />
            </div>
            <div className={`${isMobile ? "space-y-3" : "space-y-4"}`}>
              {categoryData.map((category, index) => (
                <motion.div
                  key={category.category}
                  className="relative"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, x: -20 }
                  }
                  animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion ? {} : { delay: 0.4 + index * 0.1 }
                  }
                >
                  <div
                    className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}
                  >
                    <span
                      className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}
                    >
                      {category.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`${isMobile ? "text-xs" : "text-sm"} font-bold text-gray-900`}
                      >
                        ${(category.sales / 1000).toFixed(0)}K
                      </span>
                      <span
                        className={`${isMobile ? "text-xs" : "text-xs"} px-2 py-1 rounded-full ${
                          category.growth > 0
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {category.growth > 0 ? "+" : ""}
                        {category.growth}%
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-full bg-gray-200 rounded-full ${isMobile ? "h-2" : "h-3"} overflow-hidden`}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${category.color}99, ${category.color})`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.sales / 67000) * 100}%` }}
                      transition={
                        prefersReducedMotion
                          ? {}
                          : { duration: 1, delay: 0.5 + index * 0.1 }
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Traffic Sources & Performance Metrics */}
        <div
          className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 lg:grid-cols-2 gap-6"} ${isMobile ? "mb-4" : "mb-8"}`}
        >
          {/* Traffic Sources Pie Chart */}
          <motion.div
            className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} shadow-lg border border-white/30`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? {} : { duration: 0.6, delay: 0.4 }
            }
          >
            <div
              className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}
            >
              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}
              >
                Traffic Sources
              </h3>
              <PieChartIcon
                className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-green-600`}
              />
            </div>
            <div className={`${isMobile ? "h-60" : "h-80"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 60 : 80}
                    dataKey="value"
                    stroke="none"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div
              className={`grid ${isMobile ? "grid-cols-1 gap-1" : "grid-cols-2 gap-2"} mt-4`}
            >
              {trafficData.map((source, index) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div
                    className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full`}
                    style={{ backgroundColor: source.color }}
                  />
                  <span
                    className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}
                  >
                    {source.name}
                  </span>
                  <span
                    className={`${isMobile ? "text-xs" : "text-xs"} font-medium text-gray-900`}
                  >
                    {source.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics Radial Chart */}
          <motion.div
            className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} shadow-lg border border-white/30`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? {} : { duration: 0.6, delay: 0.5 }
            }
          >
            <div
              className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}
            >
              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}
              >
                Performance Metrics
              </h3>
              <TrendingUp
                className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-orange-600`}
              />
            </div>
            <div className={`${isMobile ? "h-60" : "h-80"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={performanceData}
                  innerRadius="10%"
                  outerRadius="80%"
                >
                  <RadialBar dataKey="value" cornerRadius={10} fill="#8b5cf6" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className={`${isMobile ? "space-y-2" : "space-y-3"}`}>
              {performanceData.map((metric, index) => (
                <div
                  key={metric.metric}
                  className="flex items-center justify-between"
                >
                  <span
                    className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`}
                  >
                    {metric.metric}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`${isMobile ? "text-xs" : "text-sm"} font-bold text-gray-900`}
                    >
                      {metric.value}%
                    </span>
                    <span
                      className={`${isMobile ? "text-xs" : "text-xs"} text-gray-500`}
                    >
                      / {metric.target}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hourly Activity Line Chart */}
        <motion.div
          className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? "p-4" : "p-6"} shadow-lg border border-white/30`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.6 }}
        >
          <div
            className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}
          >
            <h3
              className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}
            >
              24-Hour Activity
            </h3>
            <Activity
              className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-purple-600`}
            />
          </div>
          <div className={`${isMobile ? "h-60" : "h-80"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={hourlyData}
                margin={{
                  top: 20,
                  right: isMobile ? 10 : 30,
                  left: isMobile ? 10 : 20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="usersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                  axisLine={true}
                  tickLine={true}
                  type="category"
                />
                <YAxis
                  tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                  axisLine={true}
                  tickLine={true}
                  type="number"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  fill="url(#usersGradient)"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", strokeWidth: 0, r: isMobile ? 3 : 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </ResponsiveLayout>
  );
}
