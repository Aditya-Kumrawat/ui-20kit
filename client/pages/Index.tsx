import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  const [selectedUser, setSelectedUser] = useState(0);
  const techStackRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const techStack = [
    { name: "React", color: "#61DAFB", icon: "⚛️", symbol: "React" },
    { name: "Node.js", color: "#339933", icon: "🟢", symbol: "Node" },
    { name: "Express", color: "#000000", icon: "🚀", symbol: "Express" },
    { name: "Firebase", color: "#FFCA28", icon: "🔥", symbol: "Firebase" },
    { name: "TypeScript", color: "#3178C6", icon: "📘", symbol: "TS" },
    { name: "MongoDB", color: "#47A248", icon: "🍃", symbol: "Mongo" },
    { name: "GraphQL", color: "#E10098", icon: "⚡", symbol: "GraphQL" },
    { name: "Docker", color: "#2496ED", icon: "🐳", symbol: "Docker" }
  ];

  const flowingBands = [
    { name: "FRONTEND", items: ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt"], color: "from-blue-600 to-purple-600" },
    { name: "BACKEND", items: ["Node.js", "Python", "Go", "Rust", "Java", "C#"], color: "from-green-600 to-blue-600" },
    { name: "DATABASE", items: ["MongoDB", "PostgreSQL", "Redis", "MySQL", "Firebase", "Supabase"], color: "from-purple-600 to-pink-600" },
    { name: "DEVOPS", items: ["Docker", "Kubernetes", "AWS", "Vercel", "Netlify", "CI/CD"], color: "from-orange-600 to-red-600" }
  ];

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
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="flex items-center justify-center pt-8 pb-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 max-w-6xl w-full mx-8 shadow-2xl">
            <motion.div 
              className="flex items-center justify-between"
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
          </div>
        </div>

        {/* Hero Section with Devices */}
        <div className="flex items-center justify-center px-8 py-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-7xl w-full shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-6 lg:col-span-1"
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
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Unleash Your
                  </h1>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Creativity<span className="text-gray-400">//</span>
                  </h1>
                </motion.div>

                {/* Action buttons */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-pink-button hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg">
                      Generate
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                      <span className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      </span>
                      View manual
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Description text */}
                <motion.div 
                  className="space-y-4 text-gray-600 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p>
                    Our technology is based on advanced deep learning algorithms that bring incredible accuracy and creativity to the image creation process.
                  </p>
                </motion.div>
              </motion.div>

              {/* Center - Interactive Devices */}
              <motion.div 
                className="lg:col-span-2 flex items-center justify-center gap-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {/* Laptop */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-80 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-2xl p-3 shadow-2xl transform perspective-1000 rotate-x-12">
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
                      <motion.div 
                        className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 flex items-center justify-center"
                        animate={{ 
                          background: [
                            "linear-gradient(135deg, #8B5CF6, #EC4899, #8B5CF6)",
                            "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                            "linear-gradient(135deg, #EC4899, #3B82F6, #8B5CF6)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <motion.div 
                          className="text-white text-2xl font-bold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          F7
                        </motion.div>
                      </motion.div>
                      {/* Screen reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                  {/* Laptop base */}
                  <div className="w-80 h-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-b-2xl shadow-lg transform translate-y-0"></div>
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-36 h-72 bg-gradient-to-br from-gray-800 to-black rounded-3xl p-2 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
                      <motion.div 
                        className="w-full h-full bg-gradient-to-b from-purple-600 via-pink-500 to-purple-700 relative"
                        animate={{ 
                          background: [
                            "linear-gradient(180deg, #8B5CF6, #EC4899, #8B5CF6)",
                            "linear-gradient(180deg, #EC4899, #3B82F6, #8B5CF6)",
                            "linear-gradient(180deg, #3B82F6, #8B5CF6, #EC4899)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {/* Notch */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                        
                        {/* Content */}
                        <div className="flex flex-col items-center justify-center h-full pt-8">
                          <motion.div 
                            className="text-white text-lg font-bold mb-4"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            F7
                          </motion.div>
                          <motion.div 
                            className="grid grid-cols-3 gap-2"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {[...Array(9)].map((_, i) => (
                              <motion.div 
                                key={i}
                                className="w-4 h-4 bg-white/20 rounded-sm"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity, 
                                  delay: i * 0.1 
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                      {/* Screen reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Full Width Tech Stack - Flowing Left to Right */}
        <div className="w-full py-8 overflow-hidden">
          <motion.div 
            className="bg-white/95 backdrop-blur-xl py-8 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Tech Stack</h3>
            <motion.div 
              className="flex gap-8 px-8"
              animate={{ x: [-100, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ width: "200%" }}
            >
              {/* Duplicate for seamless loop */}
              {[...techStack, ...techStack].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-lg min-w-[140px] border-l-4"
                  style={{ borderLeftColor: tech.color }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    y: {
                      duration: 2.5 + (index % 4) * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: 4 + (index % 3) * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.span 
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    {tech.icon}
                  </motion.span>
                  <span className="text-sm font-bold text-gray-800">{tech.name}</span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.symbol.slice(0, 2)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Flowing Bands - Like in the image */}
        <div className="w-full space-y-4 py-8">
          {flowingBands.map((band, bandIndex) => (
            <motion.div
              key={band.name}
              className={`bg-gradient-to-r ${band.color} py-6 relative overflow-hidden`}
              initial={{ opacity: 0, x: bandIndex % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + bandIndex * 0.2 }}
            >
              {/* Band Label */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
                <h3 className="text-white font-bold text-2xl tracking-wider">{band.name}</h3>
              </div>
              
              {/* Flowing Items */}
              <motion.div 
                className="flex gap-8 pl-64"
                animate={{ 
                  x: bandIndex % 2 === 0 ? [-100, -2000] : [0, -1900]
                }}
                transition={{ 
                  duration: 25 + bandIndex * 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ width: "300%" }}
              >
                {/* Triple the items for seamless loop */}
                {[...band.items, ...band.items, ...band.items].map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full min-w-[120px] text-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <span className="text-white font-semibold">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <div className="flex justify-center px-8 py-8">
          <motion.div 
            className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
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
        </div>
      </div>
    </div>
  );
}
