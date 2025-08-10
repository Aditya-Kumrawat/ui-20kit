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
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Button>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6">
                Menu
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

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
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of developers who trust our platform to build
              amazing applications with modern technologies.
            </p>
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
