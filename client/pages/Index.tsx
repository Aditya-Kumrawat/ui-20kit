import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTypescript,
  SiGraphql,
  SiDocker,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiPostgresql,
} from "react-icons/si";

export default function Index() {
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vercel", icon: SiVercel, color: "#000000" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  ];

  const menuItems = ["Home", "Features", "Services", "About", "Contact"];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const containerRect = menuRef.current?.getBoundingClientRect();

    if (containerRect) {
      setPillStyle({
        width: rect.width,
        left: rect.left - containerRect.left,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      {/* Navigation Header */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F7</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Fusion</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                href="#home"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Home
              </motion.a>
              <motion.a
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#services"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Services
              </motion.a>
              <motion.a
                href="#about"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                About
              </motion.a>
              <motion.a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Contact
              </motion.a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6">
                  Get Started
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                className="md:hidden p-2"
                size="sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section with #e9f4ff background */}
      <div className="py-20" style={{ backgroundColor: "#e9f4ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - 60% space */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              data-aos="fade-right"
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
                Built with cutting-edge technologies to deliver the best energy
                management experience
              </p>

              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-lg">
                    Generate
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-lg"
                  >
                    View Manual
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Expanded Video */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-aos="fade-left"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg w-full max-w-lg">
                <div className="relative rounded-2xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    controls={false}
                    playsInline
                    loop
                    className="w-full h-auto rounded-2xl"
                  >
                    <source
                      type="video/mp4"
                      src="https://cdn.builder.io/o/assets%2F97d222396b864180b315daa44fb39370%2F735210a826a74d11a0bd8ab720719e9d?alt=media&token=c1072c81-8a33-4145-90e6-837bcd367921&apiKey=97d222396b864180b315daa44fb39370"
                    />
                  </video>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section - Flowing Right to Left with Real Icons */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Powered by Modern Technology
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Built with cutting-edge technologies to deliver the best experience
          </p>
        </div>

        {/* Infinite Flowing Tech Stack */}
        <div className="relative">
          <motion.div
            className="flex gap-12 py-8"
            animate={{
              x: [0, -100 * techStack.length],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: `${techStack.length * 200}px` }}
          >
            {/* Triple the items for seamless loop */}
            {[...techStack, ...techStack, ...techStack].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center group min-w-[150px]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                    style={{
                      borderColor: `${tech.color}30`,
                      backgroundColor: `${tech.color}05`,
                    }}
                  >
                    <IconComponent size={32} style={{ color: tech.color }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Flowing Menu with Pill Animation */}
      <div className="bg-gray-50 py-16" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Navigation
            </h3>
            <p className="text-gray-600">
              Smooth flowing menu with interactive highlights
            </p>
          </div>

          <div
            ref={menuRef}
            className="relative bg-white rounded-full p-2 shadow-lg mx-auto max-w-2xl"
          >
            {/* Animated Pill Background */}
            <motion.div
              className="absolute top-2 bg-gray-900 rounded-full h-12 transition-all duration-300 ease-out"
              style={{
                width: pillStyle.width,
                left: pillStyle.left + 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: pillStyle.width > 0 ? 1 : 0 }}
            />

            {/* Menu Items */}
            <div className="flex justify-between relative z-10">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item}
                  className="px-6 py-3 text-gray-700 hover:text-white font-medium rounded-full transition-colors duration-300 relative z-10"
                  onMouseEnter={handleMouseEnter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="bg-white py-20" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Experience the Future
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Join thousands of developers who trust our platform to build
              amazing applications with modern technologies.
            </p>
          </motion.div>

          {/* Flowing Menu Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Explore Our Platform
            </h3>

            {/* Flowing Navigation Menu */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Development Tools */}
                <motion.div
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Development Tools</h4>
                  <p className="text-gray-600 text-sm">Advanced coding environment with AI assistance</p>
                  <motion.div
                    className="mt-4 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Explore Tools →
                  </motion.div>
                </motion.div>

                {/* Design System */}
                <motion.div
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Design System</h4>
                  <p className="text-gray-600 text-sm">Beautiful components and design tokens</p>
                  <motion.div
                    className="mt-4 text-purple-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    View Components →
                  </motion.div>
                </motion.div>

                {/* Analytics */}
                <motion.div
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h4>
                  <p className="text-gray-600 text-sm">Real-time insights and performance metrics</p>
                  <motion.div
                    className="mt-4 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    See Analytics →
                  </motion.div>
                </motion.div>
              </div>

              {/* Flowing Background Animation */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)",
                  backgroundSize: "200% 200%"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 F7. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
