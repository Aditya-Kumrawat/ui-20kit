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
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vercel", icon: SiVercel, color: "#000000" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  ];

  const aiFeatures = [
    {
      title: "Neural Networks",
      description: "Advanced deep learning models for intelligent automation",
      icon: "🧠",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Computer Vision", 
      description: "Real-time image and video analysis capabilities",
      icon: "👁️",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Natural Language",
      description: "Sophisticated text processing and generation",
      icon: "💬",
      gradient: "from-cyan-600 to-teal-600"
    },
    {
      title: "Predictive Analytics",
      description: "Data-driven insights and future predictions",
      icon: "📊",
      gradient: "from-teal-600 to-green-600"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                FusionAI
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Features", "Platform", "AI Models", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/70 hover:text-white font-medium transition-all duration-300 relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-white/70 hover:text-white hover:bg-white/10"
              >
                Sign In
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 rounded-xl px-6 shadow-lg shadow-purple-500/25">
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
        className="relative z-10 py-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-purple-300 mb-6">
                    🚀 Next-Gen AI Platform
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Unleash
                  </span>
                  <br />
                  <motion.span
                    className="text-white"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(139, 92, 246, 0.5)",
                        "0 0 40px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(139, 92, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI Power
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-white/70 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Transform your ideas into reality with our cutting-edge AI platform. 
                  Build intelligent applications across web and mobile with unprecedented ease.
                </motion.p>
              </div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-purple-500/25">
                    Start Building
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - AI Visualization */}
            <motion.div
              className="flex justify-center relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Glass Container */}
              <div className="relative w-full max-w-lg">
                <motion.div
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                  animate={{ 
                    boxShadow: [
                      "0 25px 50px rgba(139, 92, 246, 0.2)",
                      "0 25px 50px rgba(59, 130, 246, 0.2)",
                      "0 25px 50px rgba(139, 92, 246, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Neural Network Visualization */}
                  <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                    {/* Animated Neural Nodes */}
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 250">
                      {/* Connection Lines */}
                      <motion.g stroke="url(#gradient)" strokeWidth="2" fill="none" opacity="0.6">
                        <motion.line x1="50" y1="50" x2="150" y2="80" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.line x1="50" y1="125" x2="150" y2="80" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 0.7 }}
                        />
                        <motion.line x1="50" y1="200" x2="150" y2="170" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 0.9 }}
                        />
                        <motion.line x1="150" y1="80" x2="250" y2="100" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 1.1 }}
                        />
                        <motion.line x1="150" y1="170" x2="250" y2="150" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 1.3 }}
                        />
                        <motion.line x1="250" y1="100" x2="350" y2="125" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                        <motion.line x1="250" y1="150" x2="350" y2="125" 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 2, delay: 1.7 }}
                        />
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
                          r="8"
                          fill="url(#nodeGradient)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                            r: [8, 12, 8]
                          }}
                          transition={{ 
                            scale: { duration: 0.5, delay: index * 0.2 },
                            r: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                          }}
                        />
                      ))}
                      
                      {/* Gradients */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </radialGradient>
                      </defs>
                    </svg>
                    
                    {/* Floating Data Points */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
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
                        transition={{ delay: 2 + index * 0.2 }}
                      >
                        <motion.div
                          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Section with Mobile/PC Mockups */}
      <div className="relative z-10 bg-black/20 py-20 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
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
          >
            {/* Desktop Mockup */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)" }}
            >
              <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg p-6 h-48">
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded w-3/4"></div>
                    <div className="h-3 bg-white/30 rounded w-1/2"></div>
                    <div className="h-3 bg-white/20 rounded w-2/3"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-8 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded"
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
                <h3 className="text-xl font-bold text-white mb-2">💻 Web Platform</h3>
                <p className="text-white/60">Full-featured desktop experience</p>
              </div>
            </motion.div>

            {/* Mobile Mockup */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)" }}
            >
              <div className="bg-slate-800 rounded-3xl p-3 shadow-2xl max-w-xs mx-auto">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-4 h-64">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                      <div className="h-3 bg-white/40 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/30 rounded w-full"></div>
                      <div className="h-3 bg-white/20 rounded w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-12 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-lg"
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
                <h3 className="text-xl font-bold text-white mb-2">📱 Mobile App</h3>
                <p className="text-white/60">AI-powered mobile experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex gap-8 py-8"
              animate={{
                x: [0, -100 * techStack.length],
              }}
              transition={{
                duration: 40,
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
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-xl border shadow-lg group-hover:shadow-2xl transition-all duration-300"
                      style={{
                        borderColor: `${tech.color}30`,
                        backgroundColor: `${tech.color}10`,
                        boxShadow: `0 8px 32px ${tech.color}20`
                      }}
                      whileHover={{
                        boxShadow: `0 12px 40px ${tech.color}40`,
                        borderColor: `${tech.color}60`
                      }}
                    >
                      <IconComponent size={32} style={{ color: tech.color }} />
                    </motion.div>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              🤖 AI-Powered Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Harness the power of artificial intelligence with our advanced ML models
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
                  y: -10
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                
                {/* Progress Animation */}
                <motion.div
                  className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 + index * 0.2 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience the Future Section */}
      <div className="relative z-10 py-20 bg-black/20 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Experience the Future
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Join thousands of developers building the next generation of intelligent applications
            </p>
          </motion.div>

          {/* Flowing Menu Section */}
          <motion.div
            className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  title: "AI Development Tools",
                  description: "Advanced coding environment with AI assistance and real-time collaboration",
                  icon: "🛠️",
                  color: "from-purple-500 to-blue-500"
                },
                {
                  title: "Neural Networks",
                  description: "Pre-trained models and custom neural network architectures",
                  icon: "🧠",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "ML Operations",
                  description: "Complete MLOps pipeline with monitoring and deployment automation",
                  icon: "⚡",
                  color: "from-cyan-500 to-teal-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    {item.description}
                  </p>
                  <motion.div
                    className={`mt-4 text-transparent bg-gradient-to-r ${item.color} bg-clip-text text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2`}
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Explore More →
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Flowing Background Animation */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent, rgba(59, 130, 246, 0.1), transparent, rgba(6, 182, 212, 0.1), transparent)",
                backgroundSize: "300% 300%"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl font-bold mb-6"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: "linear-gradient(45deg, #8B5CF6, #3B82F6, #06B6D4, #8B5CF6)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Ready to Build the Future?
            </motion.h2>
            <p className="text-xl text-white/70 leading-relaxed mb-12">
              Start your AI journey today and transform your ideas into intelligent applications
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-purple-500/25">
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  FusionAI
                </span>
              </div>
              <p className="text-white/60 leading-relaxed max-w-md">
                Empowering developers to build intelligent applications with cutting-edge AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-white/60">
                <li>AI Models</li>
                <li>Development Tools</li>
                <li>API Documentation</li>
                <li>Tutorials</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 FusionAI. All rights reserved. Built with ❤️ for the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
