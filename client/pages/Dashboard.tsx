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

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const FloatingSidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, href: "/dashboard", active: true },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { id: "products", label: "Products", icon: Package, href: "/dashboard/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, href: "/dashboard/orders", badge: 5 },
    { id: "customers", label: "Customers", icon: Users, href: "/dashboard/customers" },
    { id: "messages", label: "Messages", icon: MessageSquare, href: "/dashboard/messages", badge: 3 },
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
    { id: "chatbot", label: "AI Chat", icon: Brain, href: "/dashboard/chatbot" },
  ];

  return (
    <motion.div
      className={`fixed left-4 top-4 bottom-4 ${
        isCollapsed ? "w-16" : "w-64"
      } z-50`}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Glass effect floating sidebar */}
      <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Logo Section */}
        <motion.div
          className="p-4 border-b border-gray-200/50"
          initial={false}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg text-white"
              whileHover={{ scale: 1.05 }}
            >
              D
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="text-lg font-bold text-gray-800"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          className="absolute -right-3 top-6 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 shadow-lg hover:bg-white transition-colors border border-gray-200/50"
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </motion.button>

        {/* Navigation Menu */}
        <div className="flex-1 p-3 space-y-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                item.active || activeItem === item.id
                  ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200/50"
                  : "hover:bg-gray-100/50 text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => {
                setActiveItem(item.id);
                if (item.href) {
                  navigate(item.href);
                }
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon
                size={18}
                className={`${
                  item.active || activeItem === item.id
                    ? "text-purple-500"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className="text-sm font-medium flex-1 text-left"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !isCollapsed && (
                <Badge className="bg-red-500 text-white text-xs min-w-[18px] h-5 flex items-center justify-center">
                  {item.badge}
                </Badge>
              )}
              {item.badge && isCollapsed && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Custom User Profile Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="p-3 border-t border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                      john@example.com
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-white/50">
                    <Edit size={14} />
                  </Button>
                </div>
                
                {/* User Stats */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Projects
                    </p>
                    <p className="text-lg font-bold text-purple-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      12
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Rating
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-current" />
                      <p className="text-lg font-bold text-yellow-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        4.8
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 h-8 text-xs bg-purple-500 hover:bg-purple-600 text-white">
                    <Settings size={12} className="mr-1" />
                    Settings
                  </Button>
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 hover:bg-red-50 border-red-200">
                    <LogOut size={12} className="text-red-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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
      <FloatingSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

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
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
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
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Glass Effect Stats Cards - 2x2 Grid */}
        <motion.div
          className="grid grid-cols-2 gap-6 mb-8"
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
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor} shadow-sm`}>
                      <stat.icon size={24} className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: "New order received", time: "2 minutes ago", user: "Sarah Johnson" },
                  { action: "Payment processed", time: "5 minutes ago", user: "Mike Chen" },
                  { action: "User registered", time: "12 minutes ago", user: "Emma Wilson" },
                  { action: "Product updated", time: "1 hour ago", user: "Admin" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/40 transition-colors">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                    </div>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Conversion Rate
                  </span>
                  <span className="text-sm font-semibold text-gray-900">3.2%</span>
                </div>
                <Progress value={32} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Customer Satisfaction
                  </span>
                  <span className="text-sm font-semibold text-gray-900">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Server Uptime
                  </span>
                  <span className="text-sm font-semibold text-gray-900">99.9%</span>
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
