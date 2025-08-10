import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, stagger } from "framer-motion";

export default function Index() {
  const [selectedUser, setSelectedUser] = useState(0);
  const techStackRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const techStack = [
    { name: "React", color: "#61DAFB", icon: "⚛️" },
    { name: "Node.js", color: "#339933", icon: "🟢" },
    { name: "Express", color: "#000000", icon: "🚀" },
    { name: "Firebase", color: "#FFCA28", icon: "🔥" }
  ];

  const menuItems = [
    { letters: ["A", "B", "C", "D", "E"], color: "from-purple-500 to-pink-500" },
    { letters: ["F", "G", "H", "I", "J"], color: "from-blue-500 to-purple-500" },
    { letters: ["K", "L", "M", "N", "O"], color: "from-pink-500 to-red-500" }
  ];

  // Container variants for staggered animations
  const techStackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8
      }
    }
  };

  const techItemVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.0
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-start via-purple-900 to-purple-end relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-32 bg-gradient-to-b from-pink-400/40 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-24 bg-gradient-to-b from-purple-400/40 to-transparent transform -rotate-12"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-6xl w-full shadow-2xl">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-8 h-8 bg-black rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-sm">F7</span>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                  Contact
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 py-2 bg-gray-800 text-white hover:bg-gray-900">
                  Menu
                </Button>
              </motion.div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">En</span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">Us</span>
              </div>
            </div>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Pink accent decoration */}
              <div className="relative">
                <motion.div 
                  className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-accent to-pink-400 rounded-full opacity-80"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -top-2 left-8 w-4 h-4 bg-pink-300 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>

              {/* Main heading */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Unleash Your
                </h1>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Creativity<span className="text-gray-400">//</span>
                </h1>
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-pink-button hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg">
                    Generate
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    </span>
                    View the manual
                  </Button>
                </motion.div>
              </motion.div>

              {/* Description text */}
              <motion.div 
                className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p>
                  Our technology is based on advanced deep learning algorithms that bring incredible accuracy and creativity to the image creation process. Equipped with a large amount of data and the ability to adapt to a variety of styles and concepts.
                </p>
                <div className="flex items-center gap-6 text-xs text-gray-400">
                  <motion.span 
                    className="hover:text-gray-600 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    How it works
                  </motion.span>
                  <motion.span 
                    className="hover:text-gray-600 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    FAQ
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right content - Video and animations */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Video in curved box */}
              <motion.div 
                className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-3xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-black/5">
                  <video
                    autoPlay
                    muted
                    controls={false}
                    playsInline
                    loop
                    className="w-full h-auto object-cover rounded-2xl"
                  >
                    <source
                      type="video/mp4"
                      src="https://cdn.builder.io/o/assets%2F97d222396b864180b315daa44fb39370%2F735210a826a74d11a0bd8ab720719e9d?alt=media&token=c1072c81-8a33-4145-90e6-837bcd367921&apiKey=97d222396b864180b315daa44fb39370"
                    />
                  </video>
                </div>
              </motion.div>

              {/* Tech Stack Flowing Animation */}
              <motion.div
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Tech Stack</h3>
                <motion.div
                  ref={techStackRef}
                  className="flex justify-center items-center gap-6 flex-wrap"
                  variants={techStackVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-md min-w-[80px]"
                      variants={techItemVariants}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                      }}
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        y: {
                          duration: 2 + index * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        rotate: {
                          duration: 3 + index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      style={{ borderLeft: `4px solid ${tech.color}` }}
                    >
                      <motion.span
                        className="text-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        {tech.icon}
                      </motion.span>
                      <span className="text-xs font-medium text-gray-700">{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* 3 Flowing Menu Stacked */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {menuItems.map((menu, menuIndex) => (
                  <motion.div
                    key={menuIndex}
                    ref={el => menuRefs.current[menuIndex] = el}
                    className={`bg-gradient-to-r ${menu.color} p-4 rounded-2xl shadow-lg`}
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex justify-between items-center">
                      {menu.letters.map((letter, letterIndex) => (
                        <motion.div
                          key={`${menuIndex}-${letterIndex}`}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold"
                          whileHover={{ 
                            scale: 1.2,
                            backgroundColor: "rgba(255,255,255,0.3)"
                          }}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            rotate: {
                              duration: 3 + letterIndex * 0.5,
                              repeat: Infinity,
                              ease: "linear"
                            }
                          }}
                        >
                          {letter}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Feature cards with closer spacing */}
              <motion.div 
                className="grid grid-cols-2 gap-3 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {/* Templates card */}
                <motion.div 
                  className="bg-gray-900 text-white p-4 rounded-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2 text-sm">Templates</h3>
                    <motion.div 
                      className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-gray-900 text-xs">→</span>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                </motion.div>

                {/* Design card */}
                <motion.div 
                  className="bg-gray-100 p-4 rounded-2xl"
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="font-semibold mb-2 text-gray-900 text-sm">Design</h3>
                  <p className="text-xs text-gray-600 mb-3">Check out the gallery of our best works. How to combine different styles</p>
                  <motion.div 
                    className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xs">→</span>
                  </motion.div>
                </motion.div>

                {/* Interesting solutions card */}
                <motion.div 
                  className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-2xl col-span-2"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">Interesting solutions</h3>
                    </div>
                    <motion.div 
                      className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white text-xs">→</span>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="mt-3 h-12 bg-white/10 rounded-lg backdrop-blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
