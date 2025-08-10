import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  SiPython,
  SiTensorflow,
  SiKubernetes,
} from "react-icons/si";

export default function Index() {
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  
  // Subtle parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 50]);

  const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vercel", icon: SiVercel, color: "#000000" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  ];

  const aiFeatures = [
    {
      title: "Neural Networks",
      description: "Advanced deep learning models for intelligent automation and pattern recognition",
      icon: "🧠",
      gradient: "from-purple-100 to-blue-100"
    },
    {
      title: "Computer Vision", 
      description: "Real-time image and video analysis with state-of-the-art accuracy",
      icon: "👁️",
      gradient: "from-blue-100 to-cyan-100"
    },
    {
      title: "Natural Language",
      description: "Sophisticated text processing, understanding, and generation capabilities",
      icon: "💬",
      gradient: "from-cyan-100 to-teal-100"
    },
    {
      title: "Predictive Analytics",
      description: "Data-driven insights and future predictions with machine learning",
      icon: "📊",
      gradient: "from-teal-100 to-green-100"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
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
    <div className="min-h-screen bg-white text-gray-900" style={{ scrollBehavior: "smooth" }}>
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
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="font-bold text-xl text-gray-900">FusionAI</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Features", "Platform", "AI Models", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-6 shadow-sm">
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative py-20 overflow-hidden"
        style={{ y: heroY }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          >
            <source
              type="video/mp4"
              src="https://cdn.builder.io/api/v1/image/assets%2F627a9941e0f84ba9a1e4d483e654346d%2F5bee1870f7d54ea68116a7d3f91cb28e"
            />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-blue-900/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              data-aos="fade-right"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-sm text-blue-700 mb-6 font-medium">
                    🚀 Next-Gen AI Platform
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Unleash Your
                  <br />
                  <span className="text-gray-900">AI Potential</span>
                  <span className="text-gray-400">//</span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Transform your ideas into intelligent applications with our cutting-edge AI platform. 
                  Build seamlessly across web and mobile platforms.
                </motion.p>
              </div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-xl shadow-sm">
                    Start Building
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-xl"
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Clean AI Visualization */}
            <motion.div
              className="flex justify-center relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-aos="fade-left"
            >
              <div className="relative w-full max-w-lg">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
                  {/* Clean Neural Network Visualization */}
                  <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 250">
                      {/* Connection Lines */}
                      <motion.g stroke="#6366f1" strokeWidth="2" fill="none" opacity="0.3">
                        {[
                          { x1: 50, y1: 50, x2: 150, y2: 80 },
                          { x1: 50, y1: 125, x2: 150, y2: 80 },
                          { x1: 50, y1: 200, x2: 150, y2: 170 },
                          { x1: 150, y1: 80, x2: 250, y2: 100 },
                          { x1: 150, y1: 170, x2: 250, y2: 150 },
                          { x1: 250, y1: 100, x2: 350, y2: 125 },
                          { x1: 250, y1: 150, x2: 350, y2: 125 }
                        ].map((line, index) => (
                          <motion.line
                            key={index}
                            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                          />
                        ))}
                      </motion.g>
                      
                      {/* Neural Nodes */}
                      {[
                        { x: 50, y: 50 }, { x: 50, y: 125 }, { x: 50, y: 200 },
                        { x: 150, y: 80 }, { x: 150, y: 170 },
                        { x: 250, y: 100 }, { x: 250, y: 150 },
                        { x: 350, y: 125 }
                      ].map((node, index) => (
                        <motion.circle
                          key={index}
                          cx={node.x}
                          cy={node.y}
                          r="6"
                          fill="#6366f1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                          }}
                          transition={{ 
                            scale: { duration: 0.5, delay: index * 0.1 },
                            opacity: { duration: 0.5, delay: index * 0.1 }
                          }}
                        />
                      ))}
                    </svg>
                    
                    {/* Floating Data Points */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-5, 5, -5],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* AI Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: "Models", value: "50+" },
                      { label: "Accuracy", value: "99.9%" },
                      { label: "Speed", value: "Real-time" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.2 }}
                      >
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-gray-600 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Section with Mobile/PC Mockups */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for seamless web and mobile experiences
            </p>
          </motion.div>

          {/* Platform Mockups */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            {/* Desktop Mockup */}
            <motion.div
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 h-48">
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-8 bg-blue-100 rounded"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">💻 Web Platform</h3>
                <p className="text-gray-600">Full-featured desktop experience</p>
              </div>
            </motion.div>

            {/* Mobile Mockup */}
            <motion.div
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-3 shadow-lg max-w-xs mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 h-64">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-12 bg-blue-100 rounded-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">📱 Mobile App</h3>
                <p className="text-gray-600">AI-powered mobile experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Tech Stack Animation */}
          <div className="relative overflow-hidden" data-aos="fade-up">
            <motion.div
              className="flex gap-8 py-8"
              animate={{
                x: [-100 * techStack.length, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: `${techStack.length * 200}px` }}
            >
              {[...techStack, ...techStack, ...techStack].map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={`${tech.name}-${index}`}
                    className="flex flex-col items-center group min-w-[150px]"
                    whileHover={{ 
                      scale: 1.1, 
                      y: -10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 border-2 bg-white shadow-md group-hover:shadow-xl transition-all duration-300"
                      style={{
                        borderColor: `${tech.color}20`,
                        backgroundColor: `${tech.color}05`,
                      }}
                      whileHover={{
                        borderColor: tech.color,
                        boxShadow: `0 12px 30px ${tech.color}30`
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent size={32} style={{ color: tech.color }} />
                      </motion.div>
                    </motion.div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Meet Your AI Assistant Section */}
      <div className="py-20" style={{ backgroundColor: "#e9f4ff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Your AI Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of intelligent interaction with our advanced AI assistant
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <div className="relative w-full max-w-2xl">
              <motion.div
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-xl"
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                  <video
                    autoPlay
                    muted
                    controls={false}
                    playsInline
                    loop
                    className="w-full h-auto rounded-2xl max-h-96 object-cover"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <source
                      type="video/mp4"
                      src="https://cdn.builder.io/o/assets%2F97d222396b864180b315daa44fb39370%2F735210a826a74d11a0bd8ab720719e9d?alt=media&token=c1072c81-8a33-4145-90e6-837bcd367921&apiKey=97d222396b864180b315daa44fb39370"
                    />
                  </video>

                  {/* Play indicator overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Description Text */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our AI assistant combines cutting-edge natural language processing with advanced machine learning
              to provide intelligent, context-aware responses. Whether you're coding, analyzing data, or exploring
              creative solutions, your AI companion is here to help you achieve more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Intelligent Conversations</h3>
                <p className="text-gray-600 text-sm">Natural, context-aware dialogue that understands your needs</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Assistance</h3>
                <p className="text-gray-600 text-sm">Instant responses and solutions powered by advanced AI</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Experience</h3>
                <p className="text-gray-600 text-sm">Adapts to your workflow and preferences over time</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🤖 AI-Powered Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence with our advanced machine learning models
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Animated Video Component */}
                <div className="relative h-32 mb-4 bg-gray-50 rounded-xl overflow-hidden">
                  {/* Neural Networks Animation */}
                  {feature.title === "Neural Networks" && (
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      {/* Neural Network Nodes */}
                      {[
                        { x: 20, y: 30, layer: 0 }, { x: 20, y: 60 }, { x: 20, y: 90 },
                        { x: 70, y: 20, layer: 1 }, { x: 70, y: 45 }, { x: 70, y: 70 }, { x: 70, y: 95 },
                        { x: 120, y: 30, layer: 2 }, { x: 120, y: 60 }, { x: 120, y: 90 },
                        { x: 170, y: 45, layer: 3 }, { x: 170, y: 75 }
                      ].map((node, i) => (
                        <motion.circle
                          key={i}
                          cx={node.x}
                          cy={node.y}
                          r="4"
                          fill="#ffffff"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.2, 1],
                            opacity: 1,
                          }}
                          transition={{
                            duration: 1,
                            delay: node.layer * 0.3 + (i % 4) * 0.1,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        />
                      ))}

                      {/* Connection Lines */}
                      {[
                        { x1: 24, y1: 30, x2: 66, y2: 20 }, { x1: 24, y1: 30, x2: 66, y2: 45 },
                        { x1: 24, y1: 60, x2: 66, y2: 45 }, { x1: 24, y1: 60, x2: 66, y2: 70 },
                        { x1: 24, y1: 90, x2: 66, y2: 70 }, { x1: 24, y1: 90, x2: 66, y2: 95 },
                        { x1: 74, y1: 20, x2: 116, y2: 30 }, { x1: 74, y1: 45, x2: 116, y2: 30 },
                        { x1: 74, y1: 70, x2: 116, y2: 60 }, { x1: 74, y1: 95, x2: 116, y2: 90 },
                        { x1: 124, y1: 30, x2: 166, y2: 45 }, { x1: 124, y1: 60, x2: 166, y2: 45 },
                        { x1: 124, y1: 90, x2: 166, y2: 75 }
                      ].map((line, i) => (
                        <motion.line
                          key={i}
                          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                          stroke="#ffffff"
                          strokeWidth="1"
                          opacity="0.6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}

                      {/* Data Flow Animation */}
                      <motion.circle
                        cx="0"
                        cy="60"
                        r="3"
                        fill="#fbbf24"
                        animate={{
                          cx: [0, 20, 70, 120, 170, 200],
                          cy: [60, 60, 45, 60, 60, 60]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut"
                        }}
                      />
                    </svg>
                  )}

                  {/* Computer Vision Animation */}
                  {feature.title === "Computer Vision" && (
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      {/* Image Processing Grid */}
                      <div className="grid grid-cols-8 gap-1 absolute inset-4">
                        {[...Array(64)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-white/30 rounded-sm"
                            initial={{ opacity: 0.3, scale: 0.8 }}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1, 0.8],
                              backgroundColor: [
                                "rgba(255,255,255,0.3)",
                                "rgba(251,191,36,0.8)",
                                "rgba(255,255,255,0.3)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              delay: (i % 8) * 0.1 + Math.floor(i / 8) * 0.05,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          />
                        ))}
                      </div>

                      {/* Scanning Line */}
                      <motion.div
                        className="absolute left-0 w-full h-0.5 bg-yellow-400 shadow-lg"
                        animate={{ y: [0, 120, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Detection Box */}
                      <motion.div
                        className="absolute border-2 border-yellow-400 rounded"
                        style={{ width: '40px', height: '30px' }}
                        animate={{
                          x: [20, 80, 140, 80, 20],
                          y: [20, 40, 60, 40, 20]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  )}

                  {/* Natural Language Processing Animation */}
                  {feature.title === "Natural Language" && (
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col justify-center p-4">
                      {/* Text Processing Lines */}
                      {["Hello World", "AI Processing", "Text Analysis", "Language Model"].map((text, i) => (
                        <motion.div
                          key={i}
                          className="text-white text-xs mb-1 font-mono"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            x: [-20, 0, 0, 20]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        >
                          {text}
                        </motion.div>
                      ))}

                      {/* Processing Dots */}
                      <div className="flex gap-1 mt-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-yellow-300 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1,
                              delay: i * 0.2,
                              repeat: Infinity
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Predictive Analytics Animation */}
                  {feature.title === "Predictive Analytics" && (
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-teal-500">
                      <svg className="w-full h-full" viewBox="0 0 200 120">
                        {/* Chart Background */}
                        <rect x="20" y="20" width="160" height="80" fill="rgba(255,255,255,0.1)" rx="4" />

                        {/* Grid Lines */}
                        {[30, 40, 50, 60, 70, 80, 90].map((y, i) => (
                          <line key={i} x1="25" y1={y} x2="175" y2={y} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        ))}

                        {/* Animated Chart Line */}
                        <motion.path
                          d="M25,90 L45,80 L65,70 L85,60 L105,50 L125,45 L145,40 L165,35 L175,30"
                          stroke="#fbbf24"
                          strokeWidth="3"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                        />

                        {/* Data Points */}
                        {[
                          { x: 25, y: 90 }, { x: 45, y: 80 }, { x: 65, y: 70 }, { x: 85, y: 60 },
                          { x: 105, y: 50 }, { x: 125, y: 45 }, { x: 145, y: 40 }, { x: 165, y: 35 }, { x: 175, y: 30 }
                        ].map((point, i) => (
                          <motion.circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="#ffffff"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: [0, 1.2, 1],
                              opacity: 1
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 * i,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                        ))}

                        {/* Bar Chart Animation */}
                        {[40, 60, 80, 100, 120, 140, 160].map((x, i) => (
                          <motion.rect
                            key={i}
                            x={x}
                            y="100"
                            width="8"
                            height="0"
                            fill="rgba(255,255,255,0.7)"
                            animate={{
                              height: [0, 10 + i * 5, 0],
                              y: [100, 90 - i * 5, 100]
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        ))}
                      </svg>
                    </div>
                  )}
                </div>

                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-sm`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>

                {/* Simple progress indicator */}
                <motion.div
                  className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience the Future Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Experience the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of developers building the next generation of intelligent applications
            </p>
          </motion.div>

          {/* Enhanced Flowing Menu Section */}
          <motion.div
            className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 rounded-3xl p-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  title: "AI Development Tools",
                  description: "Advanced coding environment with AI assistance and real-time collaboration features",
                  icon: "🛠️",
                  color: "from-blue-500 to-purple-500"
                },
                {
                  title: "Neural Networks",
                  description: "Pre-trained models and custom neural network architectures for any use case",
                  icon: "🧠",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "ML Operations",
                  description: "Complete MLOps pipeline with monitoring, deployment, and scaling automation",
                  icon: "⚡",
                  color: "from-pink-500 to-orange-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-gray-200 transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {item.description}
                  </p>
                  <motion.div
                    className="mt-4 text-gray-900 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Explore More →
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Subtle background animation */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)",
                backgroundSize: "200% 200%"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Start your AI journey today and transform your ideas into intelligent applications
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl shadow-sm">
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <span className="font-bold text-xl text-gray-900">FusionAI</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Empowering developers to build intelligent applications with cutting-edge AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li>AI Models</li>
                <li>Development Tools</li>
                <li>API Documentation</li>
                <li>Tutorials</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 FusionAI. All rights reserved. Built with ❤️ for the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
