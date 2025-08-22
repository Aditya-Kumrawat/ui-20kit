import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Star,
  Sparkles,
  ArrowRight,
  Eye,
  TrendingUp,
  Users,
  MousePointer,
} from "lucide-react";
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
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const isStatsInView = useInView(statsRef);

  // Animated counters
  const [impressions, setImpressions] = useState({ count: 0 });
  const [conversion, setConversion] = useState({ count: 0 });
  const [customers, setCustomers] = useState({ count: 0 });
  const [clicks, setClicks] = useState({ count: 0 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    // Animate counters when stats section is in view
    if (isStatsInView) {
      // Impressions (2.3M)
      const impressionsInterval = setInterval(() => {
        setImpressions((prev) => {
          if (prev.count < 23) {
            return { count: prev.count + 1 };
          }
          clearInterval(impressionsInterval);
          return prev;
        });
      }, 100);

      // Conversion (35%)
      const conversionInterval = setInterval(() => {
        setConversion((prev) => {
          if (prev.count < 350) {
            return { count: prev.count + 10 };
          }
          clearInterval(conversionInterval);
          return prev;
        });
      }, 50);

      // Customers (2341)
      const customersInterval = setInterval(() => {
        setCustomers((prev) => {
          if (prev.count < 2341) {
            return { count: prev.count + 50 };
          }
          clearInterval(customersInterval);
          return prev;
        });
      }, 20);

      // Clicks (83.3%)
      const clicksInterval = setInterval(() => {
        setClicks((prev) => {
          if (prev.count < 833) {
            return { count: prev.count + 20 };
          }
          clearInterval(clicksInterval);
          return prev;
        });
      }, 30);

      return () => {
        clearInterval(impressionsInterval);
        clearInterval(conversionInterval);
        clearInterval(customersInterval);
        clearInterval(clicksInterval);
      };
    }
  }, [isStatsInView]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
                <span className="text-white font-bold text-lg">DN</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Dream Navigator</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Analytics", "Services", "Innovation", "Contact"].map(
                (item, index) => (
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
                ),
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/login">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-6 shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-12" ref={heroRef}>
        <div className="max-w-7xl mx-auto">
          {/* Marketing Analytics Card - moved to top right */}
          <div className="flex justify-between items-start mb-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="max-w-4xl"
            >
              <div className="text-6xl font-bold text-black uppercase leading-tight tracking-wider font-sans">
                {["THE", "DREAM", "NAVIGATOR", "IS", "YOUR"].map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-4 font-semibold"
                    custom={index}
                  >
                    {word}
                    {index === 1 && <Star className="inline w-8 h-8 text-black ml-2" />}
                  </motion.span>
                ))}
                <br />
                {["PATH", "TO", "INSPIRATION"].map((word, index) => (
                  <motion.span
                    key={index + 5}
                    variants={wordVariants}
                    className="inline-block mr-4 font-normal"
                    custom={index + 5}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {["AND", "INNOVATION"].map((word, index) => (
                  <motion.span
                    key={index + 8}
                    variants={wordVariants}
                    className="inline-block mr-4 font-normal"
                    custom={index + 8}
                  >
                    {word}
                    {index === 1 && (
                      <motion.div
                        className="inline-block ml-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="inline w-8 h-8 text-black" />
                      </motion.div>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex-shrink-0 w-64 text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-black font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Marketing analytics:</p>
              <p className="text-gray-600 text-sm font-normal" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                illuminating your path to digital triumph by decoding data intricacies.
              </p>
            </motion.div>
          </div>

          <div className="flex gap-6 items-start mb-16">
            <motion.div
              className="relative flex-1 h-80 rounded-3xl overflow-hidden bg-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-3xl"
                style={{ filter: "brightness(1.1) contrast(1.1)" }}
              >
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shawnloo%20-Via%20KLICKPIN%20CF%20%281%29-HqguZQ3aNshsIhyReQcMorNbXq2f8A.mp4"
                  type="video/mp4"
                />
                {/* Fallback image */}
                <img
                  src="/images/blue-flow-video.jpeg"
                  alt="Abstract blue flowing design"
                  className="w-full h-full object-cover"
                />
              </video>

              {/* Floating service tags overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-4 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Digital Marketing
                </motion.div>
                <motion.div
                  className="absolute top-16 right-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-lg"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                >
                  Content Strategy
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-12 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                >
                  Email Marketing
                </motion.div>
                <motion.div
                  className="absolute bottom-16 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-lg"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                >
                  Social Media
                </motion.div>
              </div>
            </motion.div>

            <div className="flex gap-3 flex-shrink-0">
              {[
                { number: "01", title: "Marketing" },
                { number: "02", title: "Innovate" },
              ].map((card, index) => (
                <motion.div
                  key={card.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="w-16 h-80 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-4 flex flex-col justify-center rounded-2xl relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="transform -rotate-90 origin-center whitespace-nowrap">
                        <motion.h3
                          className="text-sm font-medium text-center"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {card.title}
                        </motion.h3>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="text-xs opacity-80" style={{ fontFamily: 'Montserrat, sans-serif' }}>{card.number}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="w-32 h-80 bg-gradient-to-b from-blue-400 to-blue-500 text-white p-4 rounded-2xl relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center z-10"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center pt-8 z-10">
                    <div className="transform -rotate-90 origin-center whitespace-nowrap">
                      <motion.h3
                        className="text-xs font-bold mb-1 text-center"
                        style={{ fontFamily: 'Montserrat, sans-serif', padding: '0 0 4px 3px' }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        SPARK YOUR CREATIVITY
                      </motion.h3>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="text-xs opacity-80" style={{ fontFamily: 'Montserrat, sans-serif' }}>04</span>
                  </div>
                </Card>
              </motion.div>

              {/* Cards 05-06 */}
              {[
                { number: "05", title: "Elevate" },
                { number: "06", title: "Transform" },
              ].map((card, index) => (
                <motion.div
                  key={card.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="w-16 h-80 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-4 flex flex-col justify-center rounded-2xl relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="transform -rotate-90 origin-center whitespace-nowrap">
                        <motion.h3
                          className="text-sm font-medium font-serif text-center"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {card.title}
                        </motion.h3>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="text-xs opacity-80 font-serif">{card.number}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Explore Button */}
            <motion.div
              className="absolute top-0 right-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-full shadow-lg font-serif font-medium relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-blue-600 -translate-x-full"
                  whileHover={{ translateX: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <span className="relative z-10">Explore</span>
                <ArrowRight className="w-4 h-4 ml-1 relative z-10" />
              </Button>
            </motion.div>
          </div>

          {/* Statistics & Info Section */}
          <div className="flex items-center justify-between" ref={statsRef}>
            {/* Left Side Text Block */}
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, x: -30 }}
              animate={isStatsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-bold text-black mb-6 font-sans">
                Fueling growth
                <br />
                with data insights
              </h2>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 font-serif font-medium shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 -translate-x-full"
                    whileHover={{ translateX: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <span className="relative z-10">Create project</span>
                  <ArrowRight className="w-4 h-4 ml-1 relative z-10" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side Stat Blocks */}
            <div className="flex gap-4">
              {[
                { icon: Eye, label: "Impressions", value: impressions.count, suffix: "M", originalValue: 2.3 },
                { icon: TrendingUp, label: "Conversion", value: conversion.count, suffix: "%", originalValue: 35 },
                { icon: Users, label: "Customers", value: customers.count, suffix: "", originalValue: 2341 },
                {
                  icon: MousePointer,
                  label: "Clicks",
                  value: clicks.count,
                  suffix: "%",
                  originalValue: 83.3,
                  prefix: "+",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="p-6 rounded-2xl shadow-sm min-w-32 text-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
                      className="relative z-10"
                    >
                      <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    </motion.div>
                    <p className="text-sm text-gray-600 mb-1 font-serif font-normal relative z-10">{stat.label}</p>
                    <p className="text-2xl font-semibold text-black font-serif relative z-10">
                      {stat.prefix}
                      {stat.originalValue === 2.3
                        ? (stat.count / 10).toFixed(1)
                        : stat.originalValue === 83.3
                          ? (stat.count / 10).toFixed(1)
                          : stat.count}
                      {stat.suffix}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            <h2
              className="text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Synera', 'Space Grotesk', sans-serif" }}
            >
              Meet Your AI Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of intelligent interaction with our advanced
              AI assistant
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
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden bg-gray-100">
                  <video
                    autoPlay
                    muted
                    controls={false}
                    playsInline
                    loop
                    className="w-full h-auto rounded-3xl max-h-96 object-cover"
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
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
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
              Our AI assistant combines cutting-edge natural language processing
              with advanced machine learning to provide intelligent,
              context-aware responses. Whether you're coding, analyzing data, or
              exploring creative solutions, your AI companion is here to help
              you achieve more.
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  Intelligent Conversations
                </h3>
                <p className="text-gray-600 text-sm">
                  Natural, context-aware dialogue that understands your needs
                </p>
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  Real-time Assistance
                </h3>
                <p className="text-gray-600 text-sm">
                  Instant responses and solutions powered by advanced AI
                </p>
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Adapts to your workflow and preferences over time
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

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
            <h2
              className="text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Synera', 'Space Grotesk', sans-serif" }}
            >
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for seamless web and mobile
              experiences
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
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  💻 Web Platform
                </h3>
                <p className="text-gray-600">
                  Full-featured desktop experience
                </p>
              </div>
            </motion.div>

            {/* Mobile Mockup */}
            <motion.div
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  📱 Mobile App
                </h3>
                <p className="text-gray-600">AI-powered mobile experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Tech Stack Animation */}
          <div className="relative overflow-hidden" data-aos="fade-up">
            <motion.div
              className="flex gap-8 py-8"
              animate={{
                x: [-100 * 15, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: `${15 * 200}px` }}
            >
              {[
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
              ].concat([
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
              ]).concat([
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
              ]).map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={`${tech.name}-${index}`}
                    className="flex flex-col items-center group min-w-[150px]"
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
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
                        boxShadow: `0 12px 30px ${tech.color}30`,
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent
                          size={32}
                          style={{ color: tech.color }}
                        />
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

      {/* AI Features Section */}
      <div className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}

        {/* Base Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
            opacity: 0.03,
          }}
        />

        {/* Main Background Image */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            opacity: 0.08,
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2F6e445024a61944279a6203b3218ce05b%2F367bf7c31aaf4132aebce1464b5e15b5?format=webp&width=800)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            mixBlendMode: "multiply",
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 40%)",
          }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 40%)",
              "radial-gradient(circle at 40% 30%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 70%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 40%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 backdrop-blur-sm"
            style={{
              width: `${60 + Math.random() * 100}px`,
              height: `${60 + Math.random() * 100}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Mesh Gradient Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, #764ba2 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, #f093fb 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #4facfe 0%, transparent 50%)
            `,
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
          }}
        />

        {/* Neural Network Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 800 600"
        >
          <defs>
            <pattern
              id="neural-grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="2" fill="#6366f1" opacity="0.3" />
              <line
                x1="50"
                y1="50"
                x2="150"
                y2="50"
                stroke="#6366f1"
                strokeWidth="1"
                opacity="0.2"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="150"
                stroke="#6366f1"
                strokeWidth="1"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2
              className="text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Synera', 'Space Grotesk', sans-serif" }}
            >
              🤖 AI-Powered Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence with our advanced
              machine learning models
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Neural Networks",
                description:
                  "Advanced deep learning models for intelligent automation and pattern recognition",
                icon: "🧠",
                gradient: "from-purple-100 to-blue-100",
              },
              {
                title: "Computer Vision",
                description:
                  "Real-time image and video analysis with state-of-the-art accuracy",
                icon: "👁️",
                gradient: "from-blue-100 to-cyan-100",
              },
              {
                title: "Natural Language",
                description:
                  "Sophisticated text processing, understanding, and generation capabilities",
                icon: "💬",
                gradient: "from-cyan-100 to-teal-100",
              },
              {
                title: "Predictive Analytics",
                description:
                  "Data-driven insights and future predictions with machine learning",
                icon: "📊",
                gradient: "from-teal-100 to-green-100",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Animated Video Component */}
                <div className="relative h-32 mb-4 bg-gray-50 rounded-xl overflow-hidden">
                  {/* Neural Networks Animation */}
                  {feature.title === "Neural Networks" && (
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 200 120"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      {/* Neural Network Nodes */}
                      {[
                        { x: 20, y: 30, layer: 0 },
                        { x: 20, y: 60 },
                        { x: 20, y: 90 },
                        { x: 70, y: 20, layer: 1 },
                        { x: 70, y: 45 },
                        { x: 70, y: 70 },
                        { x: 70, y: 95 },
                        { x: 120, y: 30, layer: 2 },
                        { x: 120, y: 60 },
                        { x: 120, y: 90 },
                        { x: 170, y: 45, layer: 3 },
                        { x: 170, y: 75 },
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
                            repeatDelay: 2,
                          }}
                        />
                      ))}

                      {/* Connection Lines */}
                      {[
                        { x1: 24, y1: 30, x2: 66, y2: 20 },
                        { x1: 24, y1: 30, x2: 66, y2: 45 },
                        { x1: 24, y1: 60, x2: 66, y2: 45 },
                        { x1: 24, y1: 60, x2: 66, y2: 70 },
                        { x1: 24, y1: 90, x2: 66, y2: 70 },
                        { x1: 24, y1: 90, x2: 66, y2: 95 },
                        { x1: 74, y1: 20, x2: 116, y2: 30 },
                        { x1: 74, y1: 45, x2: 116, y2: 30 },
                        { x1: 74, y1: 70, x2: 116, y2: 60 },
                        { x1: 74, y1: 95, x2: 116, y2: 90 },
                        { x1: 124, y1: 30, x2: 166, y2: 45 },
                        { x1: 124, y1: 60, x2: 166, y2: 45 },
                        { x1: 124, y1: 90, x2: 166, y2: 75 },
                      ].map((line, i) => (
                        <motion.line
                          key={i}
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="#ffffff"
                          strokeWidth="1"
                          opacity="0.6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1,
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
                          cy: [60, 60, 45, 60, 60, 60],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut",
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
                                "rgba(255,255,255,0.3)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              delay: (i % 8) * 0.1 + Math.floor(i / 8) * 0.05,
                              repeat: Infinity,
                              repeatDelay: 1,
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
                          ease: "easeInOut",
                        }}
                      />

                      {/* Detection Box */}
                      <motion.div
                        className="absolute border-2 border-yellow-400 rounded"
                        style={{ width: "40px", height: "30px" }}
                        animate={{
                          x: [20, 80, 140, 80, 20],
                          y: [20, 40, 60, 40, 20],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  )}

                  {/* Natural Language Processing Animation */}
                  {feature.title === "Natural Language" && (
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col justify-center p-4">
                      {/* Text Processing Lines */}
                      {[
                        "Hello World",
                        "AI Processing",
                        "Text Analysis",
                        "Language Model",
                      ].map((text, i) => (
                        <motion.div
                          key={i}
                          className="text-white text-xs mb-1 font-mono"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            x: [-20, 0, 0, 20],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 2,
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
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              delay: i * 0.2,
                              repeat: Infinity,
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
                        <rect
                          x="20"
                          y="20"
                          width="160"
                          height="80"
                          fill="rgba(255,255,255,0.1)"
                          rx="4"
                        />

                        {/* Grid Lines */}
                        {[30, 40, 50, 60, 70, 80, 90].map((y, i) => (
                          <line
                            key={i}
                            x1="25"
                            y1={y}
                            x2="175"
                            y2={y}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="0.5"
                          />
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
                            ease: "easeInOut",
                          }}
                        />

                        {/* Data Points */}
                        {[
                          { x: 25, y: 90 },
                          { x: 45, y: 80 },
                          { x: 65, y: 70 },
                          { x: 85, y: 60 },
                          { x: 105, y: 50 },
                          { x: 125, y: 45 },
                          { x: 145, y: 40 },
                          { x: 165, y: 35 },
                          { x: 175, y: 30 },
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
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 * i,
                              repeat: Infinity,
                              repeatDelay: 3,
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
                              y: [100, 90 - i * 5, 100],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 2,
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

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
      <div
        className="bg-white py-20"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F6e445024a61944279a6203b3218ce05b%2Fcf48a3f22a3549a6be89dc220ad49256)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2
              className="text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Synera', 'Space Grotesk', sans-serif" }}
            >
              Experience the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of developers building the next generation of
              intelligent applications
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
                  description:
                    "Advanced coding environment with AI assistance and real-time collaboration features",
                  icon: "🛠️",
                  color: "from-blue-500 to-purple-500",
                },
                {
                  title: "Neural Networks",
                  description:
                    "Pre-trained models and custom neural network architectures for any use case",
                  icon: "🧠",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "ML Operations",
                  description:
                    "Complete MLOps pipeline with monitoring, deployment, and scaling automation",
                  icon: "⚡",
                  color: "from-pink-500 to-orange-500",
                },
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
                background:
                  "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)",
                backgroundSize: "200% 200%",
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
            <h2
              className="text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Synera', 'Space Grotesk', sans-serif" }}
            >
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Start your AI journey today and transform your ideas into
              intelligent applications
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/login">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-xl shadow-lg">
                    Start Building
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 text-lg rounded-xl"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
