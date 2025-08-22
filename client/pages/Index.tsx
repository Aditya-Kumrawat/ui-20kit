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
                    className="inline-block mr-4 font-extralight"
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
              <p className="text-black font-semibold mb-2 font-serif">Marketing analytics:</p>
              <p className="text-gray-600 text-sm font-serif font-normal">
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
                        className="text-xs font-bold mb-1 font-serif text-center"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        SPARK YOUR CREATIVITY
                      </motion.h3>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="text-xs opacity-80 font-serif">04</span>
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

      {/* AI Assistant Feature Section */}
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
              context-aware responses. Whether you're analyzing marketing data, exploring creative solutions, or optimizing campaigns, your AI companion is here to help
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
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Data Analytics
                </h3>
                <p className="text-gray-600 text-sm">
                  Advanced analytics and insights for marketing optimization
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
                  Real-time Insights
                </h3>
                <p className="text-gray-600 text-sm">
                  Instant campaign optimization and performance tracking
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
                  Strategic Planning
                </h3>
                <p className="text-gray-600 text-sm">
                  AI-powered marketing strategies and campaign planning
                </p>
              </motion.div>
            </div>
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
              Ready to Navigate Your Dreams?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Start your journey to digital triumph with data-driven insights and innovative marketing solutions
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
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg rounded-xl shadow-lg">
                    Start Your Journey
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
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
