import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Brain,
  MessageSquare,
  Menu,
  X,
  Users,
  Calendar,
  Settings,
  Package,
  ShoppingCart,
  Camera,
} from "lucide-react";

interface MobileBottomNavProps {
  className?: string;
}

export const MobileBottomNav = ({ className = "" }: MobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  // Primary navigation items (always visible)
  const primaryItems = [
    { id: "home", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "chatbot",
      label: "AI Chat",
      icon: Brain,
      href: "/dashboard/chatbot",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
  ];

  // Secondary navigation items (shown when "More" is tapped)
  const secondaryItems = [
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
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      id: "computer-vision",
      label: "Computer Vision",
      icon: Camera,
      href: "/dashboard/computer-vision",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setShowMore(false); // Close more menu after navigation
  };

  return (
    <>
      {/* Backdrop for more menu */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMore(false)}
          />
        )}
      </AnimatePresence>

      {/* Secondary menu overlay */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            className="fixed bottom-20 left-4 right-4 z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-4">
              <div className="grid grid-cols-3 gap-3">
                {secondaryItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg"
                        : "bg-gray-50/80 text-gray-600 hover:bg-gray-100/90 hover:text-gray-800"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={20} className="mb-1" />
                    <span className="text-xs font-medium leading-tight text-center">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main bottom navigation */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.8,
        }}
      >
        <div className="mx-4 mb-4">
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 px-4 py-3"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              {/* Primary navigation items */}
              {primaryItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ minWidth: "72px" }}
                >
                  <motion.div
                    animate={
                      isActive(item.href)
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon size={20} className="mb-1" />
                  </motion.div>
                  <span className="text-xs font-medium">{item.label}</span>
                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* More button */}
              <motion.button
                onClick={() => setShowMore(!showMore)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300 ${
                  showMore
                    ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ minWidth: "72px" }}
              >
                <motion.div
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showMore ? (
                    <X size={20} className="mb-1" />
                  ) : (
                    <Menu size={20} className="mb-1" />
                  )}
                </motion.div>
                <span className="text-xs font-medium">More</span>
                {/* Active indicator for more menu */}
                {showMore && (
                  <motion.div
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
