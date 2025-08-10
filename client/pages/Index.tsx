import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  const techStack = [
    { name: "Firebase", icon: "🔥", color: "#FF6B35" },
    { name: "Next.js", icon: "▲", color: "#000000" },
    { name: "React", icon: "⚛", color: "#61DAFB" },
    { name: "Node.js", icon: "◉", color: "#339933" },
    { name: "MongoDB", icon: "🍃", color: "#47A248" },
    { name: "Express", icon: "E", color: "#000000" },
    { name: "GraphQL", icon: "◇", color: "#E535AB" },
    { name: "TypeScript", icon: "TS", color: "#3178C6" },
    { name: "Docker", icon: "🐳", color: "#2496ED" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F7</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Contact
              </Button>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6">
                Menu
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - 60% space */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Unleash Your
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Creativity<span className="text-gray-400">//</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-md">
              Built with cutting-edge technologies to deliver the best energy management experience
            </p>

            <div className="flex items-center gap-4">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-lg">
                Generate
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-lg">
                View Manual
              </Button>
            </div>
          </motion.div>

          {/* Right Content - 25% space */}
          <motion.div
            className="flex flex-col gap-8 items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Laptop */}
            <div className="relative">
              <div className="w-80 h-48 bg-gray-900 rounded-t-2xl p-3 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-900 text-2xl font-bold">F7</div>
                  </div>
                </div>
              </div>
              <div className="w-80 h-4 bg-gray-800 rounded-b-2xl"></div>
            </div>

            {/* Video beside screen */}
            <motion.div
              className="bg-gray-100 rounded-2xl p-4 shadow-lg w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  controls={false}
                  playsInline
                  loop
                  className="w-full h-auto rounded-xl"
                >
                  <source
                    type="video/mp4"
                    src="https://cdn.builder.io/o/assets%2F97d222396b864180b315daa44fb39370%2F735210a826a74d11a0bd8ab720719e9d?alt=media&token=c1072c81-8a33-4145-90e6-837bcd367921&apiKey=97d222396b864180b315daa44fb39370"
                  />
                </video>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Section - Minimalistic like the image */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Modern Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technologies to deliver the best energy management experience
            </p>
          </motion.div>

          {/* Clean Tech Stack Icons - matching the provided image */}
          <motion.div 
            className="flex justify-center items-center gap-8 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Circular Icon - matching the image style */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3 border-2 border-gray-200 bg-white shadow-sm group-hover:shadow-md transition-all duration-200"
                  style={{ 
                    color: tech.color,
                    borderColor: `${tech.color}20`
                  }}
                >
                  {tech.icon}
                </div>
                
                {/* Tech Name */}
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Section - 5% space */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          className="bg-gray-100 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="relative rounded-xl overflow-hidden">
            <video
              autoPlay
              muted
              controls={false}
              playsInline
              loop
              className="w-full h-auto rounded-xl"
            >
              <source
                type="video/mp4"
                src="https://cdn.builder.io/o/assets%2F97d222396b864180b315daa44fb39370%2F735210a826a74d11a0bd8ab720719e9d?alt=media&token=c1072c81-8a33-4145-90e6-837bcd367921&apiKey=97d222396b864180b315daa44fb39370"
              />
            </video>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 F7. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
