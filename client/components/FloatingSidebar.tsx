import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  BarChart3,
  Brain,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingCart,
  LogOut,
  Edit,
  Star,
  Camera,
  Cpu,
} from "lucide-react";

interface FloatingSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const FloatingSidebar = ({
  isCollapsed,
  setIsCollapsed,
}: FloatingSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      badge: 5,
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      href: "/dashboard/customers",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      badge: 3,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      id: "chatbot",
      label: "AI Chat",
      icon: Brain,
      href: "/dashboard/chatbot",
    },
    {
      id: "computer-vision",
      label: "Computer Vision",
      icon: Camera,
      href: "/dashboard/computer-vision",
    },
  ];

  const isActive = (href: string) => {
    // Exact match for root dashboard path
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    // For other paths, use exact match or sub-paths
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  // Update active index when location changes
  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) => isActive(item.href));
    setActiveIndex(currentIndex !== -1 ? currentIndex : -1);
  }, [location.pathname]);

  return (
    <motion.div
      className={`fixed left-4 top-4 bottom-4 ${
        isCollapsed ? "w-16" : "w-64"
      } z-50 max-h-screen`}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Glass effect floating sidebar */}
      <div className={`h-full backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
        isCollapsed
          ? "bg-gray-900/95 border border-gray-700/50"
          : "bg-white/80 border border-white/20"
      }`}>
        {/* Logo Section */}
        <motion.div className={`p-4 border-b transition-colors duration-300 ${
          isCollapsed ? "border-gray-700/50" : "border-gray-200/50"
        }`} initial={false}>
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
                  className={`text-lg font-bold dashboard-title transition-colors duration-300 ${
                    isCollapsed ? "text-white" : "text-gray-800"
                  }`}
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
          className={`absolute -right-3 top-6 w-6 h-6 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isCollapsed
              ? "bg-gray-800/90 text-gray-300 hover:bg-gray-700 border border-gray-600/50"
              : "bg-white/90 text-gray-600 hover:bg-white border border-gray-200/50"
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </motion.button>

        {/* Navigation Menu */}
        <div className="flex-1 p-3 space-y-1 relative">
          {/* Moving active indicator */}
          <motion.div
            className={`absolute rounded-xl pointer-events-none transition-all duration-300 ${
              isCollapsed
                ? "left-1 w-14 h-12 bg-gradient-to-r from-purple-400/30 to-blue-400/30 border border-purple-400/50 shadow-lg"
                : "left-3 w-[calc(100%-24px)] h-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/50"
            }`}
            initial={false}
            animate={{
              y: activeIndex >= 0 ? activeIndex * 52 : 0, // 48px height + 4px gap
              opacity: activeIndex >= 0 ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`w-full flex items-center gap-3 transition-all duration-200 group relative z-10 ${
                isCollapsed ? "p-2 justify-center" : "p-3"
              } rounded-xl ${
                isActive(item.href)
                  ? isCollapsed
                    ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
                    : "text-purple-600"
                  : isCollapsed
                    ? "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100/30 text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => navigate(item.href)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon
                size={isCollapsed ? 20 : 18}
                className={`transition-all duration-200 ${
                  isActive(item.href)
                    ? isCollapsed ? "text-white" : "text-purple-500"
                    : isCollapsed
                      ? "text-gray-400 group-hover:text-gray-200"
                      : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className={`text-sm font-medium flex-1 text-left dashboard-text transition-colors duration-200 ${
                      isCollapsed ? "text-gray-200" : "text-gray-800"
                    }`}
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

        {/* Video Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="p-3 border-t border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col relative mt-5 h-auto pb-7">
                <div className="flex flex-col relative mt-5 min-h-5 min-w-5 w-full">
                  <div className="relative">
                    <video
                      autoPlay
                      muted
                      controls={false}
                      playsInline
                      loop
                      className="w-full h-full object-cover object-center rounded-sm relative flex flex-col mt-5 min-h-5 min-w-5"
                    >
                      <source
                        type="video/mp4"
                        src="https://cdn.builder.io/o/assets%2Fa35bd991f0e541aa931714571cb88c16%2F671424c800a94207be9aa0b5e0a92325?alt=media&token=7a7dbbe0-724a-46f1-8b5e-83a5a7b0456d&apiKey=a35bd991f0e541aa931714571cb88c16"
                      />
                    </video>
                    <div className="w-full pt-[70.04048582995948%] pointer-events-none text-[0px]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
