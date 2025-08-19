import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useMobile, useReducedMotion } from "@/hooks/use-mobile";
import {
  Search,
  Bell,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { isMobile, isTablet } = useMobile();
  const prefersReducedMotion = useReducedMotion();

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "New Orders",
      value: "1,429",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Active Users",
      value: "9,532",
      change: "+18.7%",
      icon: Users,
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Performance",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "from-orange-400 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
  ];

  // Chart data for the interactive graph
  const chartData = [
    { month: "Jan", revenue: 45000, orders: 120 },
    { month: "Feb", revenue: 52000, orders: 145 },
    { month: "Mar", revenue: 48000, orders: 130 },
    { month: "Apr", revenue: 61000, orders: 180 },
    { month: "May", revenue: 55000, orders: 165 },
    { month: "Jun", revenue: 67000, orders: 200 },
    { month: "Jul", revenue: 72000, orders: 220 },
    { month: "Aug", revenue: 69000, orders: 195 },
    { month: "Sep", revenue: 78000, orders: 240 },
    { month: "Oct", revenue: 84000, orders: 260 },
    { month: "Nov", revenue: 79000, orders: 235 },
    { month: "Dec", revenue: 89000, orders: 285 },
  ];

  // Map data for global business presence
  const mapData = [
    {
      region: "North America",
      customers: 12500,
      revenue: 245000,
      growth: 15.2,
      color: "#8b5cf6",
      position: { x: 150, y: 120 },
    },
    {
      region: "Europe",
      customers: 8900,
      revenue: 189000,
      growth: 12.8,
      color: "#06b6d4",
      position: { x: 420, y: 100 },
    },
    {
      region: "Asia Pacific",
      customers: 15600,
      revenue: 298000,
      growth: 22.5,
      color: "#10b981",
      position: { x: 650, y: 150 },
    },
    {
      region: "South America",
      customers: 4200,
      revenue: 78000,
      growth: 8.3,
      color: "#f59e0b",
      position: { x: 220, y: 250 },
    },
    {
      region: "Africa",
      customers: 2800,
      revenue: 52000,
      growth: 18.7,
      color: "#ef4444",
      position: { x: 480, y: 220 },
    },
  ];

  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <ResponsiveLayout className="dashboard-page">
      <div>
        {/* Header */}
        <motion.header
          className={`mb-6 ${isMobile ? 'mb-4' : 'mb-8'}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
        >
          <div className={`flex items-center justify-between ${isMobile ? 'flex-col gap-4' : ''}`}>
            <div className={isMobile ? 'text-center' : ''}>
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 dashboard-title`}>
                Dashboard Overview
              </h1>
              <p className={`text-gray-600 mt-1 dashboard-text ${isMobile ? 'text-sm' : ''}`}>
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center gap-4" />
          </div>
        </motion.header>

        {/* Two Column Layout with Image and Stats */}
        <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex gap-5 max-lg:flex-col max-lg:gap-0'}`}>
            {/* Left Column - Image */}
            <div className={`flex flex-col ${isMobile ? 'w-full' : 'w-1/2 max-lg:w-full'}`}>
              <div
                className={`flex flex-col relative ${isMobile ? 'mt-2 h-[200px]' : 'mt-5 h-[365px]'} bg-cover bg-center bg-no-repeat border-none rounded-2xl`}
                style={{
                  backgroundImage:
                    "url(https://cdn.builder.io/api/v1/file/assets%2F3ef4243ecdf248dabd75417d35606fac%2F54bd8a0dcac741cabf36c1fc34c597e2)",
                }}
              >
                {/* Transparent glass overlay with text at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm rounded-b-lg p-6">
                  <div className="text-left">
                    <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900 mb-2 dashboard-title`}>
                      Business Analytics
                    </h2>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} dashboard-text`}>
                      Monitor your business performance with real-time insights
                      and comprehensive data visualization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Stats */}
            <div className={`flex flex-col ${isMobile ? 'w-full mt-4' : 'w-1/2 ml-5 max-lg:w-full max-lg:ml-0'}`}>
              <motion.div
                className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-6'}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.5, delay: 0.1 }}
              >
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className="group relative"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? {} : { delay: 0.1 + index * 0.1 }}
                    whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                  >
                    {/* Glass effect card with soft off-white background */}
                    <div className={`relative bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? 'p-4' : 'p-6'} shadow-lg border border-white/30 overflow-hidden`}>
                      {/* Soft lift effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl"></div>
                      <div
                        className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className={`flex items-center justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
                          <div
                            className={`${isMobile ? 'p-2' : 'p-3'} rounded-2xl bg-gradient-to-br ${stat.bgColor} shadow-sm`}
                          >
                            <stat.icon
                              size={isMobile ? 20 : 24}
                              className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                            />
                          </div>
                          <div className="text-right">
                            <p
                              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full`}
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {stat.change}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3
                            className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600 mb-1`}
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {stat.title}
                          </h3>
                          <p
                            className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Interactive Animated Graph Section */}
        <motion.div
          className={`${isMobile ? 'mb-4' : 'mb-8'}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.4 }}
        >
          <div className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? 'p-4' : 'p-6'} shadow-lg border border-white/30`}>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? false : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.6, duration: 0.4 }}
            >
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'} dashboard-title`}>
                Revenue & Orders Trend
              </h3>
              <motion.div
                className={`${isMobile ? 'h-60' : 'h-80'}`}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={prefersReducedMotion ? false : { opacity: 1, scale: 1 }}
                transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.7 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 10 : 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.1}
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
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                      labelStyle={{ color: "#374151", fontWeight: "600" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      dot={{ fill: "#8b5cf6", strokeWidth: 0, r: isMobile ? 3 : 4 }}
                      activeDot={{
                        r: isMobile ? 5 : 6,
                        stroke: "#8b5cf6",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Content Section */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-3 gap-6'}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5, delay: 0.3 }}
        >
          {/* Recent Activity */}
          <div className={`${isMobile ? '' : 'lg:col-span-2'}`}>
            <div className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? 'p-4' : 'p-6'} shadow-lg border border-white/30`}>
              <h3
                className={`${isMobile ? 'text-lg' : 'text-lg'} font-semibold text-gray-900 ${isMobile ? 'mb-3' : 'mb-4'}`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Recent Activity
              </h3>
              <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                {[
                  {
                    action: "New order received",
                    time: "2 minutes ago",
                    user: "Sarah Johnson",
                  },
                  {
                    action: "Payment processed",
                    time: "5 minutes ago",
                    user: "Mike Chen",
                  },
                  {
                    action: "User registered",
                    time: "12 minutes ago",
                    user: "Emma Wilson",
                  },
                  {
                    action: "Product updated",
                    time: "1 hour ago",
                    user: "Admin",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 ${isMobile ? 'p-2' : 'p-3'} rounded-2xl hover:bg-white/40 transition-colors`}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p
                        className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-800`}
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {activity.action}
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500`}>
                        by {activity.user}
                      </p>
                    </div>
                    <p
                      className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
            <div className={`bg-white/60 backdrop-blur-lg rounded-3xl ${isMobile ? 'p-4' : 'p-6'} shadow-lg border border-white/30`}>
              <h3
                className={`${isMobile ? 'text-lg' : 'text-lg'} font-semibold text-gray-900 ${isMobile ? 'mb-3' : 'mb-4'}`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Stats
              </h3>
              <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                <div className="flex justify-between items-center">
                  <span
                    className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Conversion Rate
                  </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>
                    3.2%
                  </span>
                </div>
                <Progress value={32} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Customer Satisfaction
                  </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>
                    4.8/5
                  </span>
                </div>
                <Progress value={96} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Server Uptime
                  </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>
                    99.9%
                  </span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ResponsiveLayout>
  );
}
