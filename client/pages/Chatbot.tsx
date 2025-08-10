import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  MoreVertical,
  Brain,
  User,
  Sparkles,
  Clock,
  CheckCheck,
  Bot,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Video,
  Code,
  Database,
  Zap,
  MessageSquare,
  Settings,
  Upload,
  Home,
  BarChart3,
  Users,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Search,
  Bell,
  TrendingUp,
  Activity,
  Target,
  PieChart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "image" | "file" | "code";
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("chatbot");
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Homepage", icon: Home, href: "/dashboard" },
    {
      id: "statistics",
      label: "Statistics",
      icon: BarChart3,
      href: "/dashboard/stats",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      href: "/dashboard/analytics",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      badge: 2,
    },
    { id: "ai", label: "AI Assistant", icon: Brain, href: "/dashboard/ai" },
    {
      id: "chatbot",
      label: "Chatbot",
      icon: MessageSquare,
      href: "/dashboard/chatbot",
      active: true,
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      href: "/dashboard/community",
    },
  ];

  const toolItems = [
    { id: "dna", label: "DNA Profile", icon: Activity },
    { id: "scanner", label: "Genetic Scanner", icon: Search },
    { id: "analysis", label: "General Analysis", icon: Target },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 shadow-2xl ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo Section */}
      <motion.div
        className="p-6 border-b border-slate-700/50"
        initial={false}
        animate={{ paddingLeft: isCollapsed ? 24 : 24 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            MY
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                DNA
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        className="absolute -right-3 top-8 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </motion.button>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
              item.active || activeItem === item.id
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30"
                : "hover:bg-slate-700/50 text-gray-300 hover:text-white"
            }`}
            onClick={() => {
              setActiveItem(item.id);
              if (item.href) {
                navigate(item.href);
              }
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon
              size={20}
              className={`${
                item.active || activeItem === item.id
                  ? "text-purple-400"
                  : "text-gray-400 group-hover:text-white"
              }`}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="text-sm font-medium flex-1 text-left"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {item.badge && !isCollapsed && (
              <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                {item.badge}
              </Badge>
            )}
            {item.badge && isCollapsed && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </motion.button>
        ))}

        {/* Connected Profiles Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="mt-8 pt-6 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-semibold text-gray-400 mb-3 px-2">
                Connected Profiles
              </div>
              <div className="flex -space-x-2 mb-3 px-2">
                {[1, 2, 3].map((i) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-slate-700">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white border-0 text-xs"
              >
                Add Profile
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Assistant Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="mt-6 pt-4 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="text-xs font-semibold text-gray-400 mb-3 px-2">
                AI Assistant
              </div>
              {toolItems.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 text-gray-300 hover:text-white transition-all duration-200 group text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <tool.icon
                    size={16}
                    className="text-gray-400 group-hover:text-purple-400"
                  />
                  <span className="text-left">{tool.label}</span>
                  <ChevronRight
                    size={12}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Chatbot() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant. I can help you with DNA analysis, genetic research, data interpretation, and much more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
      status: "read",
      suggestions: [
        "Analyze my DNA data",
        "Explain genetic variants",
        "Generate research report",
        "Help with data visualization",
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([
    "AI: Hello! I'm ready to help you with genetic analysis.",
    "User: Can you help me understand my DNA results?",
    "AI: Of course! I'll analyze your genetic data and provide insights.",
    "User: What should I look for in the analysis?",
    "AI: We'll examine key genetic markers and potential health risks.",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: "analyze",
      label: "Analyze Data",
      icon: <Database size={16} />,
      prompt: "Help me analyze my genetic data",
    },
    {
      id: "explain",
      label: "Explain",
      icon: <Brain size={16} />,
      prompt: "Explain this genetic concept to me",
    },
    {
      id: "visualize",
      label: "Visualize",
      icon: <ImageIcon size={16} />,
      prompt: "Create a visualization of my data",
    },
    {
      id: "code",
      label: "Generate Code",
      icon: <Code size={16} />,
      prompt: "Generate code for genetic analysis",
    },
    {
      id: "report",
      label: "Create Report",
      icon: <FileText size={16} />,
      prompt: "Generate a research report",
    },
    {
      id: "insights",
      label: "Get Insights",
      icon: <Sparkles size={16} />,
      prompt: "Provide insights about my genetic profile",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponses = [
          "I understand you're looking for genetic analysis. Let me process this information and provide you with detailed insights.",
          "Based on your request, I can help you analyze the genetic patterns. Would you like me to focus on specific variants or provide a comprehensive overview?",
          "Great question! Let me break down the genetic data for you. I'll analyze the key markers and provide actionable insights.",
          "I can assist with that analysis. Let me examine the genetic sequence and identify any significant patterns or variants.",
          "Perfect! I'll help you interpret this genetic information. Would you like me to generate visualizations or focus on specific aspects?",
        ];

        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: "ai",
          timestamp: new Date(),
          status: "read",
          suggestions: [
            "Show me detailed analysis",
            "Create visualization",
            "Export results",
            "Explain methodology",
          ],
        };

        setMessages((prev) =>
          prev
            .map((msg) =>
              msg.id === userMessage.id ? { ...msg, status: "read" } : msg,
            )
            .concat(aiMessage),
        );
        setIsTyping(false);
      },
      1500 + Math.random() * 1000,
    );
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return <Clock size={12} className="text-gray-400" />;
      case "sent":
        return <CheckCheck size={12} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={12} className="text-blue-500" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
        animate={{ marginLeft: isCollapsed ? 80 : 288 }}
      >
        {/* Header */}
        <motion.header
          className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  AI Chatbot
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              AI Powered
            </Badge>
            <Button size="sm" variant="ghost">
              <Settings size={20} />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical size={20} />
            </Button>
          </div>
        </motion.header>

        {/* Quick Actions */}
        <motion.div
          className="bg-white border-b border-gray-200 px-6 py-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-sm text-gray-600 whitespace-nowrap mr-2">
              Quick Actions:
            </span>
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm whitespace-nowrap transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.icon}
                <span>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Chat Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Chat and Transcript */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex items-start gap-3 max-w-[70%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Avatar className="w-8 h-8">
                      {message.sender === "user" ? (
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          <User size={16} />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                          <Brain size={16} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </motion.div>

                  {/* Message Content */}
                  <div
                    className={`space-y-1 ${message.sender === "user" ? "text-right" : ""}`}
                  >
                    <motion.div
                      className={`inline-block px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </motion.div>

                    {/* Message Info */}
                    <div
                      className={`flex items-center gap-2 text-xs text-gray-500 ${message.sender === "user" ? "justify-end" : ""}`}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "user" &&
                        getStatusIcon(message.status)}
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.sender === "ai" && (
                      <motion.div
                        className="flex flex-wrap gap-2 mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3 max-w-[70%]">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <Brain size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <motion.div
              className="bg-white border-t border-gray-200 px-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-4">
                  {/* File Upload */}
                  <motion.button
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paperclip size={20} />
                  </motion.button>

                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(inputValue);
                        }
                      }}
                      placeholder="Type your message... (Press Enter to send)"
                      className="pr-12 py-3 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500/20"
                      disabled={isTyping}
                    />

                    {/* Character count or file indicator */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {inputValue.length > 0 && <span>{inputValue.length}</span>}
                    </div>
                  </div>

                  {/* Voice Recording */}
                  <motion.button
                    onClick={toggleRecording}
                    className={`p-2 rounded-full transition-all ${
                      isRecording
                        ? "bg-red-500 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={isRecording ? { duration: 1, repeat: Infinity } : {}}
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </motion.button>

                  {/* Send Button */}
                  <motion.button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>

                {/* Input Helpers */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>AI is ready to help with genetic analysis</span>
                    {isRecording && (
                      <motion.div
                        className="flex items-center gap-1 text-red-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Recording...</span>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={12} />
                    <span>Powered by AI</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transcript Section */}
            <motion.div
              className="bg-gray-100 border-t border-gray-200 p-4 h-48 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText size={16} />
                  Conversation Transcript
                </h3>
                <div className="space-y-2">
                  {transcript.map((line, index) => (
                    <motion.div
                      key={index}
                      className="text-xs text-gray-600 p-2 bg-white rounded border"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Video Container */}
          <motion.div
            className="w-96 bg-white border-l border-gray-200 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Video Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Avatar
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div className="flex flex-col relative mt-5 min-h-5 min-w-5 w-full">
              <div className="relative">
                <video
                  autoPlay={true}
                  muted={true}
                  controls={false}
                  playsInline={true}
                  loop={true}
                  className="w-full h-full object-center rounded-[40px] relative flex flex-col min-h-0 min-w-5"
                  style={{ margin: "20px 0" }}
                >
                  <source
                    type="video/mp4"
                    src="https://cdn.builder.io/o/assets%2F2d06e16d643b4c26a7274cfb607b5ae9%2F1933a4afdc3240f493211f92f8a5bbc4%2Fcompressed?apiKey=2d06e16d643b4c26a7274cfb607b5ae9&token=1933a4afdc3240f493211f92f8a5bbc4&alt=media&optimized=true"
                  />
                </video>
                <div className="w-full pt-[70.04048582995948%] pointer-events-none text-[0px]" />
              </div>
            </div>
            <div className="flex-1 flex flex-col">

              {/* Video Controls and Info */}
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">AI Assistant</h4>
                    <p className="text-sm text-gray-500">Ready to help with analysis</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play size={16} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause size={16} />
                    </Button>
                  </div>
                </div>

                {/* Audio Visualization */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 h-8">
                    {Array.from({ length: 20 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-purple-400 rounded-full"
                        animate={{
                          height: [4, 24, 4],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          delay: i * 0.05,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Video Stats */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
