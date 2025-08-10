import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  BarChart3,
  Brain,
  MessageSquare,
  Users,
  Calendar,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Search,
  Bell,
  User,
  TrendingUp,
  Activity,
  Zap,
  Target,
  PieChart,
  LineChart,
  MoreHorizontal,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Homepage", icon: Home, href: "/dashboard" },
    {
      id: "statistics",
      label: "Statistics",
      icon: BarChart3,
      href: "/dashboard/stats",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      href: "/dashboard/analytics",
      active: true,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      badge: 2,
    },
    { id: "ai", label: "AI Assistant", icon: Brain, href: "/dashboard/ai" },
    {
      id: "chatbot",
      label: "Chatbot",
      icon: MessageSquare,
      href: "/dashboard/chatbot",
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      href: "/dashboard/community",
    },
  ];

  const toolItems = [
    { id: "dna", label: "DNA Profile", icon: Activity },
    { id: "scanner", label: "Genetic Scanner", icon: Search },
    { id: "analysis", label: "General Analysis", icon: Target },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 shadow-2xl ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo Section */}
      <motion.div
        className="p-6 border-b border-slate-700/50"
        initial={false}
        animate={{ paddingLeft: isCollapsed ? 24 : 24 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            MY
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                DNA
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        className="absolute -right-3 top-8 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </motion.button>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
              item.active || activeItem === item.id
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30"
                : "hover:bg-slate-700/50 text-gray-300 hover:text-white"
            }`}
            onClick={() => {
              setActiveItem(item.id);
              if (item.id === "chatbot") {
                navigate("/dashboard/chatbot");
              }
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon
              size={20}
              className={`${item.active || activeItem === item.id ? "text-purple-400" : "text-gray-400 group-hover:text-white"}`}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="text-sm font-medium flex-1 text-left"
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
              <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                {item.badge}
              </Badge>
            )}
            {item.badge && isCollapsed && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </motion.button>
        ))}


        {/* AI Assistant Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="mt-6 pt-4 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="text-xs font-semibold text-gray-400 mb-3 px-2">
                AI Assistant
              </div>
              {toolItems.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 text-gray-300 hover:text-white transition-all duration-200 group text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <tool.icon
                    size={16}
                    className="text-gray-400 group-hover:text-purple-400"
                  />
                  <span className="text-left">{tool.label}</span>
                  <ChevronRight
                    size={12}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Container at Bottom */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="p-4 border-t border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(https://cdn.builder.io/o/assets%2Fad2efc99155b417783200fc7999ced3f%2Fd5ef5f2a2a2d4fdda37b8beb31b2b7b7?alt=media&token=83995d22-6f0a-4e4a-979b-17c838b7d2cb&apiKey=ad2efc99155b417783200fc7999ced3f)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Brain size={24} className="text-purple-400" />
                </motion.div>
              </div>
              <div className="text-xs text-gray-400 mt-2">AI Active</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const aiTexts = [
    "Hello! I'm your AI assistant ready to help you analyze your data.",
    "I can process your genetic information and provide insights.",
    "Let me know how I can assist you with your research today.",
    "I'm here to make complex data analysis simple and intuitive.",
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < aiTexts.length) {
      const text = aiTexts[currentIndex];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          setCurrentText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % aiTexts.length);
            setCurrentText("");
          }, 3000);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentIndex, aiTexts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-72"}`}
        animate={{ marginLeft: isCollapsed ? 80 : 288 }}
      >
        {/* Header */}
        <motion.header
          className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DNA Overview</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Day
                </Badge>
                <Badge variant="outline" className="text-gray-600">
                  Week
                </Badge>
                <Badge variant="outline" className="text-gray-600">
                  Month
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <Button size="sm" variant="ghost" className="relative">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
              </motion.div>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  BK
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Becca Kirby
                </div>
                <div className="text-xs text-gray-500">Chicago, USA</div>
              </div>
              <Button size="sm" variant="ghost">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Video Section Below Topbar */}
        <div className="px-6 py-4">
          <div className="flex flex-col relative mt-5 min-h-5 min-w-5 w-full">
            <div className="relative">
              <video
                autoPlay
                muted
                controls={false}
                playsInline
                loop
                className="w-full h-full object-cover object-center rounded relative flex flex-col mt-5 min-h-5 min-w-5"
              >
                <source
                  type="video/mp4"
                  src="https://cdn.builder.io/o/assets%2F8113a1f7d41a4af69ae85ec0b219ae27%2Fb234cbf3b022438b979d06d7177cf3b6%2Fcompressed?apiKey=8113a1f7d41a4af69ae85ec0b219ae27&token=b234cbf3b022438b979d06d7177cf3b6&alt=media&optimized=true"
                />
              </video>
              <div className="w-full pt-[70.04%] pointer-events-none text-0" />
            </div>
          </div>
          <div className="max-w-4xl">
            <div className="mt-4 text-center" />
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              {
                label: "Analysis in progress",
                value: "27",
                icon: TrendingUp,
                color: "text-blue-600",
              },
              {
                label: "Active treatments",
                value: "31",
                icon: Activity,
                color: "text-green-600",
              },
              {
                label: "Hereditary",
                value: "92",
                icon: Zap,
                color: "text-purple-600",
                subtitle: "Average rate",
              },
              {
                label: "Researches",
                value: "Sept. 15, 2022",
                icon: Target,
                color: "text-orange-600",
                subtitle: "September 15, 2022 / Week",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.subtitle}
                        </p>
                      )}
                    </div>
                    <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DNA Visualization */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 h-96 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    DNA Interaction Visualization
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs"
                    >
                      Export
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs"
                    >
                      Share
                    </Button>
                  </div>
                </div>
                <div className="relative h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* DNA Helix Animation */}
                  <motion.svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* DNA Helix Structure */}
                    {Array.from({ length: 20 }, (_, i) => (
                      <g key={i}>
                        <motion.ellipse
                          cx={200}
                          cy={50 + i * 12}
                          rx={100 - i * 2}
                          ry={10}
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          opacity={0.6}
                          animate={{
                            rx: [100 - i * 2, 120 - i * 2, 100 - i * 2],
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.ellipse
                          cx={200}
                          cy={50 + i * 12}
                          rx={80 - i * 1.5}
                          ry={8}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity={0.6}
                          animate={{
                            rx: [80 - i * 1.5, 100 - i * 1.5, 80 - i * 1.5],
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.1 + 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </g>
                    ))}

                    {/* DNA Base Pairs */}
                    {Array.from({ length: 15 }, (_, i) => (
                      <motion.line
                        key={`base-${i}`}
                        x1={150 + Math.sin(i * 0.3) * 30}
                        y1={60 + i * 15}
                        x2={250 - Math.sin(i * 0.3) * 30}
                        y2={60 + i * 15}
                        stroke="#ec4899"
                        strokeWidth="3"
                        opacity={0.7}
                        animate={{
                          opacity: [0.7, 1, 0.7],
                          strokeWidth: [3, 4, 3],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.svg>

                  {/* Floating Particles */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-purple-400 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  <div className="absolute bottom-4 left-4 text-sm text-gray-700">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                      <div className="font-semibold">Good interaction</div>
                      <div className="text-xs text-gray-600">
                        with other molecules
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Avatar Video and AI Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Avatar Video Component */}
              <Card className="p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Assistant
                </h3>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>

                    {/* Avatar Animation */}
                    <motion.div
                      className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0.7)",
                          "0 0 0 20px rgba(139, 92, 246, 0)",
                          "0 0 0 0 rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Brain size={32} className="text-white" />
                    </motion.div>

                    {/* Audio Waves */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-purple-400 rounded-full"
                          animate={{
                            height: [4, 16, 4],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Typewriter Text */}
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[80px] flex items-center">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentText}
                      <motion.span
                        className="inline-block w-2 h-4 bg-purple-500 ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </p>
                  </div>
                </div>
              </Card>

              {/* Statistics Summary */}
              <Card className="p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Research Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Calculating the risk of diseases
                    </span>
                    <motion.div
                      className="w-4 h-4 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Diagnosis of genetic diseases
                    </span>
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Patterns in heredity
                    </span>
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Chart and Progress Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Average Rate Chart */}
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Average Rate
                </h3>
                <div className="text-sm text-gray-500">Average rate</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">92</div>
              <div className="text-sm text-gray-600 mb-4">
                The degree of recent complications in hereditary polycythemia
              </div>

              {/* Chart Visualization */}
              <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-center p-4 relative overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 200 100"
                >
                  <motion.path
                    d="M20,80 Q60,40 100,60 Q140,20 180,30"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="180"
                    cy="30"
                    r="4"
                    fill="#8b5cf6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  />
                </svg>
              </div>
            </Card>

            {/* Research Progress */}
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Research Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">DNA Analysis</span>
                    <span className="text-sm font-medium text-gray-900">
                      75%
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Genetic Mapping
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      60%
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Risk Assessment
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      90%
                    </span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Report Generation
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      45%
                    </span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
