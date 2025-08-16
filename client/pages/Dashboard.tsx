import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FloatingSidebar } from "@/components/FloatingSidebar";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      position: { x: 150, y: 120 }
    },
    {
      region: "Europe",
      customers: 8900,
      revenue: 189000,
      growth: 12.8,
      color: "#06b6d4",
      position: { x: 420, y: 100 }
    },
    {
      region: "Asia Pacific",
      customers: 15600,
      revenue: 298000,
      growth: 22.5,
      color: "#10b981",
      position: { x: 650, y: 150 }
    },
    {
      region: "South America",
      customers: 4200,
      revenue: 78000,
      growth: 8.3,
      color: "#f59e0b",
      position: { x: 220, y: 250 }
    },
    {
      region: "Africa",
      customers: 2800,
      revenue: 52000,
      growth: 18.7,
      color: "#ef4444",
      position: { x: 480, y: 220 }
    }
  ];

  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FloatingSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-72"} p-6`}
        animate={{ marginLeft: isCollapsed ? 80 : 288 }}
      >
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dashboard-title">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1 dashboard-text">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <Button size="sm" variant="ghost" className="relative">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
              </motion.div>
              <Button
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Two Column Layout with Image and Stats */}
        <div className="mb-8">
          <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
            {/* Left Column - Image */}
            <div className="flex flex-col w-1/2 max-lg:w-full">
              <div
                className="flex flex-col relative mt-5 h-[365px] bg-cover bg-center bg-no-repeat border-none rounded-lg"
                style={{
                  backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F447cf80127094586a85dadd4107e395f%2Fa5359b0377cc4ba3acdc5b61c68211a2)",
                }}
              >
                <div className="flex flex-col relative mt-5 h-[321px] pt-[120px]" />

                {/* Transparent glass overlay with text at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm rounded-b-lg p-6">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-white mb-2 dashboard-title">
                      Business Analytics
                    </h2>
                    <p className="text-white/90 text-sm dashboard-text">
                      Monitor your business performance with real-time insights and comprehensive data visualization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Stats */}
            <div className="flex flex-col w-1/2 ml-5 max-lg:w-full max-lg:ml-0">
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Glass effect card with soft off-white background */}
                    <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 overflow-hidden">
                      {/* Soft lift effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl"></div>
                      <div
                        className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor} shadow-sm`}
                          >
                            <stat.icon
                              size={24}
                              className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                            />
                          </div>
                          <div className="text-right">
                            <p
                              className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {stat.change}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3
                            className="text-sm font-medium text-gray-600 mb-1"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {stat.title}
                          </h3>
                          <p
                            className="text-2xl font-bold text-gray-900"
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
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h3
                className="text-xl font-bold text-gray-900 mb-6 dashboard-title"
              >
                Revenue & Orders Trend
              </h3>
              <motion.div
                className="h-80"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                      }}
                      labelStyle={{ color: '#374151', fontWeight: '600' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      dot={{ fill: '#8b5cf6', strokeWidth: 0, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: '#8b5cf6',
                        strokeWidth: 2,
                        fill: '#ffffff'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive World Map Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dashboard-title">
                Global Business Presence
              </h3>
              <div className="text-sm text-gray-600 dashboard-text">
                Live data from 5 continents
              </div>
            </div>

            <div className="relative">
              {/* World Map SVG */}
              <motion.div
                className="relative h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                >
                  {/* World Map Continents */}
                  <motion.path
                    d="M100 80 Q200 60 300 90 L350 85 Q400 80 450 95 L500 100 Q550 90 600 110 L650 115 Q700 105 750 120 L750 180 Q700 170 650 175 L600 180 Q550 175 500 185 L450 190 Q400 185 350 195 L300 200 Q200 195 100 210 Z"
                    fill="#e2e8f0"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />

                  {/* North America */}
                  <motion.path
                    d="M80 100 Q150 80 220 110 L250 105 Q280 100 310 115 L340 120 Q370 110 400 125 L420 130 Q450 120 480 135 L480 190 Q450 180 420 185 L400 190 Q370 185 340 195 L310 200 Q280 195 250 205 L220 210 Q150 205 80 220 Z"
                    fill="#ddd6fe"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.05, fill: "#c4b5fd" }}
                    onMouseEnter={() => setHoveredRegion(mapData[0])}
                    onMouseLeave={() => setHoveredRegion(null)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />

                  {/* Europe */}
                  <motion.path
                    d="M380 90 Q420 85 460 95 L480 92 Q500 88 520 98 L540 100 Q560 95 580 105 L580 150 Q560 145 540 150 L520 155 Q500 150 480 160 L460 165 Q420 160 380 170 Z"
                    fill="#cffafe"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.05, fill: "#a7f3d0" }}
                    onMouseEnter={() => setHoveredRegion(mapData[1])}
                    onMouseLeave={() => setHoveredRegion(null)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />

                  {/* Asia Pacific */}
                  <motion.path
                    d="M580 120 Q630 115 680 125 L700 122 Q720 118 740 128 L760 130 Q780 125 800 135 L800 200 Q780 195 760 200 L740 205 Q720 200 700 210 L680 215 Q630 210 580 220 Z"
                    fill="#d1fae5"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.05, fill: "#a7f3d0" }}
                    onMouseEnter={() => setHoveredRegion(mapData[2])}
                    onMouseLeave={() => setHoveredRegion(null)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  />

                  {/* South America */}
                  <motion.path
                    d="M180 240 Q220 235 260 245 L280 242 Q300 238 320 248 L340 250 Q360 245 380 255 L380 320 Q360 315 340 320 L320 325 Q300 320 280 330 L260 335 Q220 330 180 340 Z"
                    fill="#fef3c7"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.05, fill: "#fde68a" }}
                    onMouseEnter={() => setHoveredRegion(mapData[3])}
                    onMouseLeave={() => setHoveredRegion(null)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                  />

                  {/* Africa */}
                  <motion.path
                    d="M420 200 Q460 195 500 205 L520 202 Q540 198 560 208 L580 210 Q600 205 620 215 L620 280 Q600 275 580 280 L560 285 Q540 280 520 290 L500 295 Q460 290 420 300 Z"
                    fill="#fee2e2"
                    stroke="#ef4444"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.05, fill: "#fecaca" }}
                    onMouseEnter={() => setHoveredRegion(mapData[4])}
                    onMouseLeave={() => setHoveredRegion(null)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 2 }}
                  />

                  {/* Animated Data Points */}
                  {mapData.map((region, index) => (
                    <motion.g key={region.region}>
                      <motion.circle
                        cx={region.position.x}
                        cy={region.position.y}
                        r="8"
                        fill={region.color}
                        className="cursor-pointer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ delay: 2.2 + index * 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                      <motion.circle
                        cx={region.position.x}
                        cy={region.position.y}
                        r="15"
                        fill="none"
                        stroke={region.color}
                        strokeWidth="2"
                        opacity="0.4"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          delay: 2.4 + index * 0.2,
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.g>
                  ))}
                </svg>

                {/* Hover Tooltip */}
                {hoveredRegion && (
                  <motion.div
                    className="absolute bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 pointer-events-none"
                    style={{
                      left: hoveredRegion.position.x - 50,
                      top: hoveredRegion.position.y - 80,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{hoveredRegion.region}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-medium">{hoveredRegion.customers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium">${hoveredRegion.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-medium text-green-600">+{hoveredRegion.growth}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Map Legend */}
              <motion.div
                className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                {mapData.map((region, index) => (
                  <motion.div
                    key={region.region}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{region.region}</div>
                      <div className="text-xs text-gray-600">{region.customers.toLocaleString()} customers</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Additional Content Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30">
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
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
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/40 transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium text-gray-800"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        by {activity.user}
                      </p>
                    </div>
                    <p
                      className="text-xs text-gray-500"
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
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30">
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Conversion Rate
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    3.2%
                  </span>
                </div>
                <Progress value={32} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Customer Satisfaction
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    4.8/5
                  </span>
                </div>
                <Progress value={96} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Server Uptime
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    99.9%
                  </span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
