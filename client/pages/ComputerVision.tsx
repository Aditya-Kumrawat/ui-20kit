import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import {
  Camera,
  Upload,
  Download,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Brain,
  Eye,
  Scan,
  Image as ImageIcon,
  Video,
  FileText,
  Activity,
  Target,
  Cpu,
  Database,
  TrendingUp,
} from "lucide-react";

export default function ComputerVision() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedModel, setSelectedModel] = useState("image-classification");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [results, setResults] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const fileInputRef = useRef(null);

  // ML Models configuration
  const mlModels = [
    {
      id: "image-classification",
      name: "Image Classification",
      icon: ImageIcon,
      description: "Classify objects and scenes in images",
      accuracy: 94.2,
      type: "Computer Vision",
      status: "active",
      color: "#8b5cf6",
    },
    {
      id: "object-detection",
      name: "Object Detection",
      icon: Target,
      description: "Detect and locate objects in images",
      accuracy: 89.7,
      type: "Computer Vision",
      status: "active",
      color: "#06b6d4",
    },
  ];

  // Fake predictions for demo
  const samplePredictions = {
    "image-classification": [
      { label: "Golden Retriever", confidence: 0.94 },
      { label: "Labrador", confidence: 0.87 },
      { label: "Dog", confidence: 0.92 },
    ],
    "object-detection": [
      { label: "Person", confidence: 0.96, bbox: [120, 80, 200, 300] },
      { label: "Car", confidence: 0.89, bbox: [300, 150, 500, 280] },
      { label: "Tree", confidence: 0.75, bbox: [50, 20, 150, 200] },
    ],
    "face-recognition": [
      { label: "Face Detected", confidence: 0.97, features: 68 },
      { label: "Age Estimation", confidence: 0.85, value: "25-30 years" },
      { label: "Gender", confidence: 0.92, value: "Male" },
    ],
  };

  // Performance metrics
  const performanceMetrics = [
    { name: "Total Predictions", value: "1,248,592", change: "+12.5%", color: "#8b5cf6" },
    { name: "Average Accuracy", value: "92.1%", change: "+2.3%", color: "#10b981" },
    { name: "Processing Speed", value: "0.3s", change: "-15.2%", color: "#06b6d4" },
    { name: "Active Models", value: "6", change: "+1", color: "#f59e0b" },
  ];

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        processImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const processImage = useCallback(() => {
    setIsProcessing(true);
    setConfidence(0);
    
    // Simulate ML processing with progress
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResults(samplePredictions[selectedModel] || []);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  }, [selectedModel]);

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FloatingSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-72"} p-6`}
        animate={{ marginLeft: isCollapsed ? 80 : 288 }}
      >
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dashboard-title">
                Computer Vision & ML
              </h1>
              <p className="text-gray-600 mt-1 dashboard-text">
                Advanced machine learning models for image and video analysis
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/60 backdrop-blur-sm border-white/30"
              >
                <Download size={16} className="mr-2" />
                Export Models
              </Button>
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                <Cpu size={16} className="mr-2" />
                Train New Model
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Performance Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Activity style={{ color: metric.color }} className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Models Section */}
        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Available Models</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mlModels.map((model, index) => (
              <motion.div
                key={model.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedModel === model.id
                    ? "border-purple-300 bg-purple-50"
                    : "border-white/50 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => setSelectedModel(model.id)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${model.color}20` }}
                  >
                    <model.icon style={{ color: model.color }} className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{model.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{model.type}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          model.status === "active"
                            ? "bg-green-100 text-green-600"
                            : model.status === "training"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {model.status}
                      </span>
                      <span className="text-sm font-bold" style={{ color: model.color }}>
                        {model.accuracy}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

          {/* Upload & Processing Area */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Upload Area */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Image Processing</h3>
              </div>

              {/* Upload Zone */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Image for Analysis
                    </h4>
                    <p className="text-gray-600">
                      Drag and drop an image or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports JPG, PNG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Selected Model Info */}
              <div className="mt-6 p-4 bg-white/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">Selected Model:</h5>
                    <p className="text-gray-600">
                      {mlModels.find(m => m.id === selectedModel)?.name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={!uploadedImage || isProcessing}
                    onClick={processImage}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {isProcessing ? (
                      <><Activity className="w-4 h-4 mr-2 animate-spin" /> Processing</>
                    ) : (
                      <><Zap className="w-4 h-4 mr-2" /> Analyze</>
                    )}
                  </Button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
