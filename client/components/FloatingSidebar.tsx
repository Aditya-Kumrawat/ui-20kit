import React, { useState } from "react";
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
} from "lucide-react";

interface FloatingSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const FloatingSidebar = ({ isCollapsed, setIsCollapsed }: FloatingSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { id: "products", label: "Products", icon: Package, href: "/dashboard/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, href: "/dashboard/orders", badge: 5 },
    { id: "customers", label: "Customers", icon: Users, href: "/dashboard/customers" },
    { id: "messages", label: "Messages", icon: MessageSquare, href: "/dashboard/messages", badge: 3 },
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
    { id: "chatbot", label: "AI Chat", icon: Brain, href: "/dashboard/chatbot" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

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
                  className="text-lg font-bold text-gray-800 dashboard-title"
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
                isActive(item.href)
                  ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200/50"
                  : "hover:bg-gray-100/50 text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => navigate(item.href)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon
                size={18}
                className={`${
                  isActive(item.href)
                    ? "text-purple-500"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className="text-sm font-medium flex-1 text-left dashboard-text"
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
                    <p className="text-sm font-semibold text-gray-800 truncate dashboard-title">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 truncate dashboard-text">
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
                    <p className="text-xs font-medium text-gray-600 dashboard-text">
                      Projects
                    </p>
                    <p className="text-lg font-bold text-purple-600 dashboard-title">
                      12
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-600 dashboard-text">
                      Rating
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-current" />
                      <p className="text-lg font-bold text-yellow-600 dashboard-title">
                        4.8
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 h-8 text-xs bg-purple-500 hover:bg-purple-600 text-white dashboard-text">
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
