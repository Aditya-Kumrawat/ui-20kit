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
