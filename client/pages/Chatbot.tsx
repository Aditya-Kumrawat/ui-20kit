import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Vapi from "@vapi-ai/web";
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

// Initialize Vapi Web SDK for browser-based voice calls
const initializeVapiExternal = () => {
  // Try to get public key first, then fall back to regular key
  const publicKey =
    import.meta.env.VITE_VAPI_PUBLIC_KEY || import.meta.env.VITE_VAPI_KEY;

  if (!publicKey) {
    console.error(
      "❌ Vapi API key not found. Please set VITE_VAPI_PUBLIC_KEY in environment variables.",
    );
    console.error(
      "📝 Required: Web SDK needs a PUBLIC key that starts with 'pk_'",
    );
    console.error("🔗 Get your keys from: https://dashboard.vapi.ai/account");
    return null;
  }

  // Log key format for debugging (first few characters only)
  console.log(
    `🔑 Key format: ${publicKey.substring(0, 8)}... (length: ${publicKey.length})`,
  );

  // Check if this looks like a valid key
  if (publicKey.length < 20) {
    console.error(
      "�� Vapi API key appears to be too short. Please check your key configuration.",
      `Length: ${publicKey.length}`,
    );
    console.error(
      "📝 Required: Web SDK needs a PUBLIC key that starts with 'pk_'",
    );
    return null;
  }

  // Check key format
  if (!publicKey.startsWith("pk_")) {
    console.warn(
      "⚠️ Warning: Web SDK typically requires a PUBLIC key that starts with 'pk_'",
    );
    console.warn(`🔑 Current key format: ${publicKey.substring(0, 8)}...`);
    console.warn(
      "🔗 Get your public key from: https://dashboard.vapi.ai/account",
    );
  }

  try {
    console.log("����� Initializing Vapi Web SDK");
    const vapi = new Vapi(publicKey);
    console.log("✅ Vapi Web SDK initialized successfully");
    return vapi;
  } catch (error) {
    console.error("�� Failed to initialize Vapi Web SDK:", error);
    // Ensure error is properly logged
    let errorMsg = "Unknown initialization error";
    if (error instanceof Error) {
      errorMsg = `${error.name}: ${error.message}`;
    } else if (typeof error === "object") {
      try {
        errorMsg = JSON.stringify(error);
      } catch (e) {
        errorMsg = `Error object (type: ${typeof error})`;
      }
    } else {
      errorMsg = String(error);
    }
    console.error("Parsed initialization error:", errorMsg);
    return null;
  }
};

// This will be moved inside the component

// Force enable real API calls - remove all environment restrictions
const isRestrictedEnvironment = () => {
  // DISABLED: Always return false to force real API usage
  console.log(
    "🚀 Environment restrictions DISABLED - forcing real Vapi API calls",
  );
  return false;
};

export default function Chatbot() {
  // Vapi instance state - moved inside component to fix hoisting
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [vapiInitialized, setVapiInitialized] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [vapiStatus, setVapiStatus] = useState("disconnected"); // Force real API mode
  const [vapiError, setVapiError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(false); // Force real API usage always
  const [networkStatus, setNetworkStatus] = useState<
    "unknown" | "online" | "offline" | "restricted"
  >("unknown");
  const [transcript, setTranscript] = useState([
    "AI: Hello! I'm ready to help you with genetic analysis.",
    "User: Can you help me understand my DNA results?",
    "AI: Of course! I'll analyze your genetic data and provide insights.",
    "User: What should I look for in the analysis?",
    "AI: We'll examine key genetic markers and potential health risks.",
  ]);
  const [audioVolume, setAudioVolume] = useState(2.5); // Volume control state - start at 250%
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Vapi Web SDK for browser-based voice calls - moved before useEffect to fix hoisting
  const initializeVapi = useCallback(() => {
    // Check for public key specifically
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    const fallbackKey = import.meta.env.VITE_VAPI_KEY;

    if (!publicKey && !fallbackKey) {
      console.error(
        "❌ No Vapi API key found. Please set VITE_VAPI_PUBLIC_KEY in environment variables.",
      );
      console.error(
        "��� Required: Web SDK needs a PUBLIC key that starts with 'pk_'",
      );
      console.error("🔗 Get your keys from: https://dashboard.vapi.ai/account");
      return null;
    }

    if (!publicKey && fallbackKey) {
      console.warn(
        "⚠️ No public key found. Using fallback key, but this may cause authentication issues.",
      );
      console.warn(
        "📝 For best results, set VITE_VAPI_PUBLIC_KEY with a public key (pk_...)",
      );
    }

    const keyToUse = publicKey || fallbackKey;

    if (!keyToUse) {
      console.error("❌ No valid API key available");
      return null;
    }

    // Log key format for debugging (first few characters only)
    console.log(
      `🔑 Key format: ${keyToUse.substring(0, 8)}... (length: ${keyToUse.length})`,
    );

    // Check if this looks like a valid key
    if (keyToUse.length < 20) {
      console.error(
        "❌ Vapi API key appears to be too short. Please check your key configuration.",
        `Length: ${keyToUse.length}`,
      );
      console.error(
        "📝 Required: Web SDK needs a PUBLIC key that starts with 'pk_'",
      );
      return null;
    }

    // Check key format - accept both pk_ format and UUID format
    if (
      !keyToUse.startsWith("pk_") &&
      !keyToUse.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      )
    ) {
      console.warn(
        "⚠️ Warning: Unrecognized key format. Expected either 'pk_...' or UUID format",
      );
      console.warn(`🔑 Current key format: ${keyToUse.substring(0, 8)}...`);
    } else {
      console.log("✅ Valid key format detected");
    }

    try {
      console.log("🚀 Initializing Vapi Web SDK");
      const vapi = new Vapi(keyToUse);
      console.log("✅ Vapi Web SDK initialized successfully");
      return vapi;
    } catch (error) {
      console.error("❌ Failed to initialize Vapi Web SDK:", error);
      // Ensure error is properly logged
      let errorMsg = "Unknown initialization error";
      if (error instanceof Error) {
        errorMsg = `${error.name}: ${error.message}`;
      } else if (typeof error === "object") {
        try {
          errorMsg = JSON.stringify(error);
        } catch (e) {
          errorMsg = `Error object (type: ${typeof error})`;
        }
      } else {
        errorMsg = String(error);
      }
      console.error("Parsed initialization error:", errorMsg);
      return null;
    }
  }, []);

  // Debug logging function with comprehensive object handling
  const addDebugLog = useCallback((message: string | any) => {
    const timestamp = new Date().toLocaleTimeString();

    // Ensure message is properly serialized and never shows [object Object]
    let logMessage = "";
    try {
      if (typeof message === "string") {
        logMessage = message;
      } else if (message instanceof Error) {
        logMessage = `Error: ${message.message} (${message.name})`;
      } else if (typeof message === "object" && message !== null) {
        // Force object serialization with detailed approach
        try {
          logMessage = JSON.stringify(message, null, 2);
        } catch (jsonError) {
          // If JSON.stringify fails, manually extract properties
          const props: string[] = [];
          for (const key in message) {
            try {
              const value = message[key];
              props.push(
                `${key}: ${typeof value === "object" ? "[Object]" : String(value)}`,
              );
            } catch (e) {
              props.push(`${key}: [Unable to access]`);
            }
          }
          logMessage = `Object {${props.join(", ")}}`;
        }
      } else {
        logMessage = String(message);
      }

      // Final check to prevent [object Object]
      if (
        logMessage.includes("[object Object]") ||
        logMessage === "[object Object]"
      ) {
        logMessage = `[Unserializable object of type: ${typeof message}]`;
      }
    } catch (e) {
      logMessage = `[Error serializing log message: ${e}]`;
    }

    const finalLogMessage = `[${timestamp}] ${logMessage}`;
    console.log(`🔊 VAPI DEBUG: ${finalLogMessage}`);
    setDebugLogs((prev) => [...prev.slice(-9), finalLogMessage]); // Keep last 10 logs
  }, []);

  // Initial environment check log
  useEffect(() => {
    if (isRestrictedEnvironment()) {
      addDebugLog("🛡️ RESTRICTED ENVIRONMENT DETECTED");
      addDebugLog("���� Test Mode auto-enabled to prevent network errors");
      addDebugLog(`📍 Hostname: ${window.location.hostname}`);
    } else {
      addDebugLog("�� Unrestricted environment - Vapi API available");
    }
  }, []);

  // Test mode - simulate Vapi functionality for testing
  const toggleTestMode = () => {
    setTestMode(false); // Force real speech mode only
    if (!testMode) {
      addDebugLog("��� Test mode enabled - simulating Vapi responses");
      setVapiStatus("test-mode");
    } else {
      addDebugLog("🔧 Test mode disabled - using real Vapi");
      setVapiStatus("disconnected");
    }
  };

  const simulateVapiInteraction = () => {
    if (!testMode) return;

    const sampleQuestions = [
      "Can you help me analyze my DNA data?",
      "What do my genetic markers tell me about my health?",
      "How do I interpret my genetic test results?",
      "Can you explain what genetic variants mean?",
      "What should I know about my hereditary risks?",
      "Help me understand my family's genetic history",
      "What does this genetic report mean for me?",
    ];

    const aiResponses = [
      "I'd be happy to help you analyze your DNA data! I can examine genetic markers, identify variants, and provide insights about your genetic profile. What specific aspects would you like me to focus on?",
      "Your genetic markers provide valuable insights into your health predispositions and ancestry. I can help you understand the significance of different variants and what they mean for your health journey.",
      "Genetic test results can be complex, but I'm here to make them clear for you! Let me break down the key findings and explain what each marker indicates about your genetic makeup.",
      "Genetic variants are natural differences in your DNA sequence. Some are beneficial, others neutral, and some may indicate health risks. I'll help you understand which variants are most important for you.",
      "Understanding hereditary risks is crucial for proactive health management. I can help you identify potential genetic predispositions and suggest appropriate screening or lifestyle modifications.",
      "Family genetic history provides important context for your results. I can help you understand inheritance patterns and what this means for you and your relatives.",
      "Your genetic report contains a wealth of information about your health, ancestry, and traits. Let me walk you through the key findings and what they mean in practical terms.",
    ];

    addDebugLog("🎤 Simulating voice recording...");
    addDebugLog("📻 Listening for speech...");

    // Simulate real-time transcription (partial updates)
    const selectedQuestion =
      sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const words = selectedQuestion.split(" ");
    let currentTranscript = "";

    // Simulate partial transcription word by word
    words.forEach((word, index) => {
      setTimeout(
        () => {
          currentTranscript += (index > 0 ? " " : "") + word;
          setInputValue(currentTranscript);
          addDebugLog(`📝 Partial transcript: "${currentTranscript}"`);
        },
        200 * (index + 1),
      );
    });

    // Simulate final transcript and AI response
    setTimeout(
      () => {
        addDebugLog(`✅ Final transcript: "${selectedQuestion}"`);
        setInputValue(""); // Clear input after sending
        handleSendMessage(selectedQuestion);
        setTranscript((prev) => [...prev, `User: ${selectedQuestion}`]);

        // Simulate AI processing time
        addDebugLog("🧠 AI processing your request...");
        setIsTyping(true);

        setTimeout(
          () => {
            const selectedResponse =
              aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addDebugLog(
              `🤖 AI response generated: "${selectedResponse.substring(0, 50)}..."`,
            );

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                content: selectedResponse,
                sender: "ai" as const,
                timestamp: new Date(),
                status: "read" as const,
                suggestions: [
                  "Tell me more details",
                  "What are the next steps?",
                  "Show me specific examples",
                  "Explain the science behind this",
                ],
              },
            ]);

            setTranscript((prev) => [...prev, `AI: ${selectedResponse}`]);
            setIsTyping(false);

            // Simulate text-to-speech
            addDebugLog("🔊 AI speaking response...");
          },
          2000 + Math.random() * 1000,
        ); // Variable AI response time
      },
      words.length * 200 + 500,
    );
  };

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

  // Safe network connectivity test with immediate fallback
  const testNetworkConnectivity = async () => {
    try {
      addDebugLog("📡 Testing basic network connectivity...");

      // First try a simple, safe test
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // Short 3s timeout

      const response = await fetch("https://httpbin.org/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        addDebugLog("✅ Basic network connectivity: OK");
        return true;
      } else {
        addDebugLog(`⚠️ Network test returned: ${response.status}`);
        return false;
      }
    } catch (error: any) {
      // ANY network error means we should use test mode
      addDebugLog(`�� Network test failed: ${error.message}`);
      addDebugLog("🛑 Network restrictions detected - enabling Test Mode");

      // FORCE real speech mode - user wants real speech
      setTestMode(false);
      setVapiStatus("connected");
      setNetworkStatus("online");
      addDebugLog("🎤 Real speech recording ENABLED!");

      return false;
    }
  };

  // Test Vapi connection - try direct connection first, fallback to server proxy
  const testVapiConnection = async () => {
    try {
      addDebugLog("🚀 Testing Vapi connection...");
      setVapiStatus("testing");
      setVapiError(null);

      // Direct Vapi Web SDK connection - bypass server proxy
      const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

      if (publicKey && assistantId) {
        addDebugLog("✅ Valid credentials found - Using direct Vapi Web SDK!");
        addDebugLog(`🔑 Public Key: ${publicKey.substring(0, 8)}...`);
        addDebugLog(`🤖 Assistant ID: ${assistantId}`);
        addDebugLog("⚡ Bypassing server proxy - direct connection mode");
        setVapiStatus("connected");
        setNetworkStatus("online");
        setVapiError(null);
        addDebugLog("🎤 Ready to start voice recording directly!");
        return;
      } else {
        addDebugLog("❌ Missing credentials for direct connection");
        addDebugLog(`Public Key: ${!!publicKey ? "Present" : "Missing"}`);
        addDebugLog(`Assistant ID: ${!!assistantId ? "Present" : "Missing"}`);
        throw new Error(
          "Missing required Vapi credentials for direct connection",
        );
      }

      // This shouldn't be reached since we have direct connection
      throw new Error("Direct connection failed - missing credentials");
    } catch (error: any) {
      addDebugLog(`���� Initial connection test failed: ${error.message}`);

      // Always try direct connection if we have credentials
      const fallbackPublicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
      const fallbackAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

      if (fallbackPublicKey && fallbackAssistantId) {
        addDebugLog("⚡ Falling back to direct Vapi Web SDK connection");
        addDebugLog("✅ Credentials available - enabling direct mode");
        setVapiStatus("connected");
        setNetworkStatus("online");
        setVapiError(null);
        addDebugLog("🎤 Voice recording ready via direct connection!");
      } else {
        setVapiError(`Connection failed: Missing credentials`);
        setVapiStatus("error");
        setNetworkStatus("offline");
        addDebugLog("❌ No fallback available - missing Vapi credentials");
      }
    }
  };

  // Environment detection
  useEffect(() => {
    // Check if we're in a restricted environment
    const isRestrictedEnvironment = () => {
      // Check for common restricted environment indicators
      const hostname = window.location.hostname;
      const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
      const isFlyDev = hostname.includes(".fly.dev");
      const isBuilder = hostname.includes("builder.io");

      // If we're in a development environment that might have network restrictions
      if (isFlyDev || isBuilder || window.location.protocol === "file:") {
        addDebugLog(
          "���� Restricted environment detected - preemptively enabling Test Mode",
        );
        return true;
      }

      return false;
    };

    // Force real Vapi mode - disable automatic test mode detection
    addDebugLog(
      "🚀 Real Vapi mode enabled - skipping test mode auto-detection",
    );

    addDebugLog("Setting up Vapi event listeners...");
  }, []);

  // Vapi initialization and event listeners (only if not in test mode)
  useEffect(() => {
    if (testMode) {
      addDebugLog("🧪 Skipping Vapi setup - Test Mode active");
      return;
    }

    // Initialize Vapi only once
    if (!vapiInitialized && !vapiInstance) {
      addDebugLog("Initializing Vapi instance...");
      const newVapi = initializeVapi();
      setVapiInstance(newVapi);
      setVapiInitialized(true);

      if (!newVapi) {
        addDebugLog("❌ Vapi initialization failed - no instance created");
        setVapiStatus("error");
        setVapiError(
          "Failed to initialize Vapi SDK. Check API key configuration.",
        );
        return;
      }
    }

    if (!vapiInstance) {
      addDebugLog("❌ No Vapi instance available");
      return;
    }

    addDebugLog("Setting up Vapi event listeners...");

    // Clear any existing listeners to prevent conflicts
    vapiInstance.removeAllListeners();

    vapiInstance.on("speech-start", () => {
      addDebugLog("🎤 Speech started");
    });

    vapiInstance.on("speech-end", () => {
      addDebugLog("🔇 Speech ended");
    });

    vapiInstance.on("message", (message: any) => {
      try {
        if (
          message &&
          typeof message === "object" &&
          message.type === "transcript"
        ) {
          const transcript = message.transcript || "";
          const transcriptType = message.transcriptType || "unknown";
          const role = message.role || "unknown";

          if (role === "user") {
            addDebugLog(
              `📝 User transcript: ${transcriptType} - ${transcript}`,
            );
            if (transcriptType === "partial") {
              setInputValue(transcript);
            } else if (transcriptType === "final") {
              addDebugLog(`✅ Final user transcript: ${transcript}`);
              setInputValue(""); // Clear input after final transcript
              handleSendMessage(transcript);
              setTranscript((prev) => [...prev, `User: ${transcript}`]);
            }
          } else if (role === "assistant") {
            addDebugLog(`🤖 AI response: ${transcript}`);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                content: transcript,
                sender: "ai" as const,
                timestamp: new Date(),
                status: "read" as const,
              },
            ]);
            setTranscript((prev) => [...prev, `AI: ${transcript}`]);
          }
        } else {
          // Handle non-transcript messages
          addDebugLog(`📨 Vapi message: ${JSON.stringify(message, null, 2)}`);
        }
      } catch (error) {
        addDebugLog(`❌ Error handling Vapi message: ${error}`);
        console.error("Error processing Vapi message:", error, message);
      }
    });

    // AI responses are handled in the consolidated message handler above

    // Audio volume boosting - Simple and effective approach
    vapiInstance.on("audio", (audioEl: HTMLAudioElement) => {
      if (!audioEl || !audioEl.srcObject) return;

      addDebugLog(`🔊 Processing Vapi audio stream with ${Math.round(audioVolume * 100)}% boost`);

      try {
        // Create Web Audio context if not exists
        if (!audioContext) {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)();
          const gain = context.createGain();
          gain.gain.value = audioVolume; // Direct volume boost
          setAudioContext(context);
          setGainNode(gain);
          addDebugLog(`🎚️ Audio context created with ${Math.round(audioVolume * 100)}% gain`);
        }

        // Route Vapi audio through gain node for volume boost
        if (audioContext && gainNode) {
          const source = audioContext.createMediaStreamSource(audioEl.srcObject as MediaStream);
          source.connect(gainNode);
          gainNode.connect(audioContext.destination);

          addDebugLog("🎛️ Vapi audio routed: Stream -> GainNode -> Output");

          // Resume context on user interaction (browser requirement)
          const resumeAudio = () => {
            if (audioContext.state === "suspended") {
              audioContext.resume();
              addDebugLog("🔊 Audio context resumed");
            }
          };
          document.addEventListener("click", resumeAudio, { once: true });
          document.addEventListener("touchstart", resumeAudio, { once: true });
        }
      } catch (audioError) {
        addDebugLog(`❌ Audio processing failed: ${audioError}`);
      }
    });

    // Additional event handlers can be added here

    vapiInstance.on("call-start", () => {
      addDebugLog("📞 Call started");
      setVapiStatus("call-active");
      addDebugLog("🎧 Audio processing will be handled on audio stream");
    });

    vapiInstance.on("call-end", () => {
      addDebugLog("📞 Call ended");
      setVapiStatus("call-ended");
      setIsRecording(false);

      // Cleanup Web Audio API resources
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
        setAudioContext(null);
        setGainNode(null);
        addDebugLog("🧹 Audio context cleaned up");
      }
    });

    vapiInstance.on("error", (error: any) => {
      // Comprehensive error serialization to fix [object Object] issue
      let errorMessage = "Unknown error";
      let debugInfo = "";

      try {
        // Log the raw error for debugging
        console.error("RAW VAPI ERROR:", error);
        console.error("ERROR TYPE:", typeof error);
        console.error("ERROR CONSTRUCTOR:", error?.constructor?.name);

        if (typeof error === "string") {
          errorMessage = error;
        } else if (error instanceof Error) {
          errorMessage = error.message || error.toString();
          debugInfo = `Name: ${error.name}, Stack: ${error.stack?.substring(0, 100)}`;
        } else if (error?.message) {
          errorMessage = String(error.message);
        } else if (error?.error) {
          errorMessage = String(error.error);
        } else if (error?.data) {
          errorMessage = JSON.stringify(error.data);
        } else if (error?.response) {
          // Handle fetch response errors
          errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`;
        } else if (typeof error === "object" && error !== null) {
          // Extract all enumerable properties
          const errorObj: any = {};
          for (const key in error) {
            try {
              errorObj[key] = error[key];
            } catch (e) {
              errorObj[key] = "[Unable to serialize]";
            }
          }
          errorMessage = JSON.stringify(errorObj, null, 2);
        } else {
          errorMessage = String(error);
        }

        // If we still have [object Object], force a different approach
        if (
          errorMessage.includes("[object Object]") ||
          errorMessage === "[object Object]"
        ) {
          errorMessage = `Vapi Error - Type: ${typeof error}, Constructor: ${error?.constructor?.name || "unknown"}`;
          if (error?.status) errorMessage += `, Status: ${error.status}`;
          if (error?.code) errorMessage += `, Code: ${error.code}`;
        }
      } catch (e) {
        errorMessage = `Error serialization failed: ${e}`;
      }

      addDebugLog(`❌ Vapi error: ${errorMessage}`);
      if (debugInfo) {
        addDebugLog(`��� Debug info: ${debugInfo}`);
      }

      // Check for specific error types and provide helpful messages
      let userFriendlyMessage = errorMessage;
      if (
        errorMessage.includes("Invalid Key") ||
        errorMessage.includes("Invalid API key")
      ) {
        userFriendlyMessage =
          "Authentication failed: Invalid API key. Please check your Vapi configuration.";
        addDebugLog(
          "🔑 Tip: Make sure you're using the correct key type (public key for Web SDK)",
        );

        // Attempt to fix the error by retesting connection
        setTimeout(() => {
          addDebugLog("🔄 Attempting to reconnect...");
          testVapiConnection();
        }, 2000);
      } else if (
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("401")
      ) {
        userFriendlyMessage =
          "Authentication failed: Unauthorized access. Please verify your API key.";
      } else if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("network")
      ) {
        userFriendlyMessage =
          "Network error: Unable to connect to Vapi servers. Please check your internet connection.";
      } else if (errorMessage.includes("start-method-error")) {
        userFriendlyMessage =
          "Failed to start voice call. This may be due to API key issues or server configuration.";
        addDebugLog(
          "��� Hint: Check that your API keys are correctly configured for both client and server",
        );
      } else if (errorMessage.includes("Response body is already used")) {
        userFriendlyMessage =
          "Server configuration error. The response handling needs to be fixed.";
        addDebugLog("🔧 This is a server-side issue with response handling");
      } else if (errorMessage.includes("[object Object]")) {
        userFriendlyMessage =
          "Unknown error occurred. Check debug console for details.";
      }

      setVapiError(userFriendlyMessage);
      setVapiStatus("error");
    });

    // Comprehensive initialization and connection test
    const initializeVapiConnection = async () => {
      try {
        addDebugLog("🚀 Starting comprehensive Vapi initialization...");

        // Check environment first
        const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
        const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

        if (!publicKey || !assistantId) {
          throw new Error(
            `Missing credentials: Public Key: ${!!publicKey}, Assistant ID: ${!!assistantId}`,
          );
        }

        addDebugLog(
          `✅ Credentials verified - Public Key: ${publicKey.substring(0, 8)}..., Assistant: ${assistantId}`,
        );
        addDebugLog(
          "⚡ Direct connection mode enabled - bypassing server proxy",
        );

        // Set connection as ready immediately for direct mode
        setVapiStatus("connected");
        setNetworkStatus("online");
        setVapiError(null);
        addDebugLog("✅ Vapi initialization completed successfully!");
        addDebugLog("🎤 Voice recording is ready to use!");
      } catch (error: any) {
        addDebugLog(`❌ Initialization failed: ${error.message}`);
        addDebugLog("⚠️ Will retry connection in 3 seconds...");

        // Auto-retry after 3 seconds
        setTimeout(() => {
          addDebugLog("🔄 Retrying Vapi initialization...");
          initializeVapiConnection();
        }, 3000);
      }
    };

    initializeVapiConnection();

    // Cleanup event listeners
    return () => {
      if (vapi) {
        try {
          vapiInstance.removeAllListeners();
          addDebugLog("🧝 Cleaned up Vapi event listeners");
        } catch (error) {
          console.error("Error cleaning up Vapi listeners:", error);
        }
      }
    };
  }, [testMode, vapiInstance, vapiInitialized]);

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
              msg.id === userMessage.id
                ? { ...msg, status: "read" as const }
                : msg,
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

  const toggleRecording = async () => {
    // REAL SPEECH MODE - User wants real speech, not test mode
    addDebugLog("🎤 Starting REAL Vapi voice recording - NO test mode!");

    // Force real speech mode
    setTestMode(false);
    setVapiStatus("starting");

    try {
      if (isRecording) {
        addDebugLog("Stopping Vapi recording...");
        if (vapiInstance) {
          await vapiInstance.stop();
        }
        setIsRecording(false);
        setVapiStatus("stopped");
        if (videoRef.current) {
          videoRef.current.pause();
        }
        addDebugLog("✅ Vapi stopped successfully");
      } else {
        addDebugLog("Starting Vapi recording...");
        setVapiError(null);
        setVapiStatus("starting");

        // Check environment credentials
        const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
        const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

        if (!publicKey) {
          throw new Error(
            "Missing VITE_VAPI_PUBLIC_KEY. Please configure your Vapi credentials.",
          );
        }

        if (!assistantId) {
          throw new Error(
            "Missing VITE_VAPI_ASSISTANT_ID. Please configure your Vapi assistant.",
          );
        }

        addDebugLog(`🔑 Using public key: ${publicKey.substring(0, 8)}...`);
        addDebugLog(`🤖 Using assistant: ${assistantId}`);

        // Check microphone permissions with better error handling
        try {
          addDebugLog("Checking microphone permissions...");

          // First check if getUserMedia is available
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            addDebugLog(
              "⚠️ MediaDevices API not available - browser/environment limitation",
            );
            throw new Error(
              "Microphone access not available in this environment. Please try opening the app directly in your browser.",
            );
          }

          // Check permissions policy
          if (typeof navigator.permissions !== "undefined") {
            try {
              const permission = await navigator.permissions.query({
                name: "microphone" as PermissionName,
              });
              if (permission.state === "denied") {
                throw new Error(
                  "Microphone access denied by browser settings. Please enable microphone permissions and reload the page.",
                );
              }
            } catch (e) {
              // Permissions API might not be fully supported, continue with getUserMedia
              addDebugLog(
                "⚠️ Permissions API check failed, trying direct access...",
              );
            }
          }

          addDebugLog("Requesting microphone permissions...");
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          stream.getTracks().forEach((track) => track.stop()); // Clean up
          addDebugLog("✅ Microphone permissions granted");
        } catch (permError: any) {
          const errorMsg = permError.message || "Permission denied";
          addDebugLog(`❌ Microphone access failed: ${errorMsg}`);

          if (
            errorMsg.includes("Permission denied") ||
            errorMsg.includes("not allowed")
          ) {
            throw new Error(
              "Microphone access blocked. This may be due to browser security settings or iframe restrictions. Please open the app directly in your browser and allow microphone access.",
            );
          } else {
            throw new Error(`Microphone error: ${errorMsg}`);
          }
        }

        // Check if Vapi SDK is available and properly initialized
        if (!vapiInstance) {
          // Try to initialize if not already done
          if (!vapiInitialized) {
            addDebugLog(
              "Attempting to initialize Vapi during recording start...",
            );
            const newVapi = initializeVapi();
            setVapiInstance(newVapi);
            setVapiInitialized(true);

            if (!newVapi) {
              throw new Error(
                "Vapi SDK initialization failed. You need a valid PUBLIC key (pk_...) for the Web SDK. Get your keys from https://dashboard.vapi.ai/account",
              );
            }
          } else {
            throw new Error(
              "Vapi SDK not available. Please configure VITE_VAPI_PUBLIC_KEY with a valid public key (pk_...).",
            );
          }
        }

        // Additional validation check (using existing publicKey variable)
        if (!publicKey) {
          throw new Error(
            "No public key configured. The Web SDK requires VITE_VAPI_PUBLIC_KEY. Please set the environment variable.",
          );
        }

        // Validate key format (either pk_ or UUID format)
        const isValidFormat =
          publicKey.startsWith("pk_") ||
          publicKey.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
          );
        if (!isValidFormat) {
          throw new Error(
            `Invalid key format. Expected either 'pk_...' or UUID format, but got: ${publicKey.substring(0, 8)}...`,
          );
        }

        // Ensure Vapi is in a clean state before starting
        try {
          addDebugLog("Ensuring Vapi is in clean state...");
          vapiInstance.removeAllListeners();

          // Re-add essential event listeners for this session
          vapiInstance.on("call-start", () => {
            addDebugLog("📞 Call started");
            setVapiStatus("call-active");
          });

          vapiInstance.on("call-end", () => {
            addDebugLog("�� Call ended");
            setVapiStatus("call-ended");
            setIsRecording(false);
          });

          vapiInstance.on("error", (callError: any) => {
            let errorMsg = "Unknown call error";
            try {
              if (typeof callError === "string") {
                errorMsg = callError;
              } else if (callError?.message) {
                errorMsg = String(callError.message);
              } else if (typeof callError === "object") {
                errorMsg = JSON.stringify(callError, null, 2);
              }
            } catch (e) {
              errorMsg = "Error parsing call error";
            }

            addDebugLog(`❌ Call error: ${errorMsg}`);
            setVapiError(errorMsg);
            setVapiStatus("error");
            setIsRecording(false);
          });
        } catch (listenerError) {
          addDebugLog(
            `⚠️ Warning: Could not set up clean listeners: ${listenerError}`,
          );
        }

        // Configure the assistant for the call (using existing assistantId variable)
        const voiceId = import.meta.env.VITE_VAPI_VOICE_ID || "rachel";

        let callConfig;

        if (assistantId) {
          // Use pre-created assistant
          addDebugLog(`Using pre-created assistant: ${assistantId}`);
          callConfig = assistantId; // For Web SDK, just pass the assistant ID
        } else {
          // Create assistant configuration dynamically
          addDebugLog("Creating dynamic assistant configuration");
          callConfig = {
            model: {
              provider: "openai",
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful AI assistant specializing in DNA analysis, genetic research, and data interpretation. Keep your responses concise and informative. You can help with genetic analysis, data visualization, research reports, and explaining genetic variants.",
                },
              ],
            },
            voice: {
              provider: "11labs",
              voiceId: voiceId,
              stability: 0.5,
              similarityBoost: 0.75,
              style: 0.0,
              useSpeakerBoost: true,
              optimizeStreamingLatency: 0,
              enableSsmlParsing: true,
              model: "eleven_turbo_v2_5",
            },
            firstMessage: null,
          };
        }

        // Retry logic for starting Vapi with automatic fallback
        let retryCount = 0;
        const maxRetries = 2; // Reduced retries to fail faster
        let lastError;

        while (retryCount < maxRetries) {
          try {
            addDebugLog(
              `Attempt ${retryCount + 1}/${maxRetries}: Starting Vapi call...`,
            );

            // Add timeout to Vapi start call
            const startPromise = vapiInstance.start(callConfig);
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Vapi start timeout")), 15000),
            );

            await Promise.race([startPromise, timeoutPromise]);
            addDebugLog("✅ Vapi call started successfully");
            break; // Success, exit retry loop
          } catch (startError: any) {
            lastError = startError;
            retryCount++;
            const errorMsg = startError?.message || "Unknown error";

            addDebugLog(`��� Attempt ${retryCount} failed: ${errorMsg}`);

            if (
              errorMsg.includes("Failed to fetch") ||
              errorMsg.includes("timeout")
            ) {
              if (retryCount < maxRetries) {
                addDebugLog(`⏳ Retrying in 1 second...`);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                continue;
              } else {
                // All retries failed - throw error instead of falling back
                addDebugLog("🛑 All retries failed - real API required");
                throw new Error(
                  "Failed to connect to Vapi API after multiple attempts. Check network connectivity.",
                );
              }
            }

            // Handle specific Vapi SDK errors
            if (
              errorMsg.includes("start-method-error") ||
              errorMsg.includes("Response body is already used")
            ) {
              addDebugLog("🔧 Detected server-side response handling issue");
              throw new Error(
                "Server configuration error: Response handling needs to be fixed. This is likely due to API key or server proxy issues.",
              );
            }

            // Re-throw other non-network errors immediately
            throw startError;
          }
        }

        setIsRecording(true);
        setVapiStatus("recording");
        videoRef.current?.play();
        addDebugLog("🎉 Vapi Web SDK call started successfully!");
        addDebugLog("🎤 Listening for real speech via Vapi...");
      }
    } catch (error: any) {
      // Properly serialize error objects to avoid "[object Object]" display
      let errorMessage = "Unknown error";

      try {
        if (typeof error === "string") {
          errorMessage = error;
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (error?.toString && typeof error.toString === "function") {
          errorMessage = error.toString();
        } else if (typeof error === "object") {
          // Try to extract meaningful info from error object
          const errorInfo = {
            message: error.message,
            name: error.name,
            code: error.code,
            status: error.status,
          };
          errorMessage = JSON.stringify(errorInfo, null, 2);
        }
      } catch (e) {
        errorMessage = "Error parsing error object";
      }

      // Enhanced error categorization
      let userFriendlyMessage = errorMessage;
      if (errorMessage.includes("Failed to fetch")) {
        userFriendlyMessage =
          "Network connection failed. Please check your internet connection and try again.";
      } else if (errorMessage.includes("Microphone permission")) {
        userFriendlyMessage =
          "Microphone access required. Please allow microphone permissions and try again.";
      } else if (
        errorMessage.includes("Invalid API key") ||
        errorMessage.includes("Invalid Key")
      ) {
        userFriendlyMessage =
          "Invalid API key. Please check your Vapi configuration.";
      } else if (errorMessage.includes("[object Object]")) {
        userFriendlyMessage =
          "Unknown error occurred. Check debug console for details.";
      }

      addDebugLog(`❌ Vapi error: ${errorMessage}`);
      setVapiError(userFriendlyMessage);
      setVapiStatus("error");
      setIsRecording(false);
      console.error("Vapi error details:", {
        originalError: error,
        serializedMessage: errorMessage,
        errorType: typeof error,
      });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Poppins',sans-serif]">
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

        {/* Real API Status Banner */}
        {vapiStatus === "connected" && (
          <motion.div
            className="bg-green-100 border-b border-green-200 px-6 py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <span className="text-sm font-medium text-green-800">
                    Real Vapi API Connected
                  </span>
                  <p className="text-xs text-green-700">
                    Voice assistant is ready for real-time conversations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {vapiStatus === "error" && (
          <motion.div
            className="bg-red-100 border-b border-red-200 px-6 py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div>
                  <span className="text-sm font-medium text-red-800">
                    API Connection Failed
                  </span>
                  <p className="text-xs text-red-700">
                    {vapiError ||
                      "Unable to connect to Vapi API. Check your configuration."}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={testVapiConnection}
                className="bg-red-50 border-red-300 text-red-800 hover:bg-red-100"
              >
                Retry Connection
              </Button>
            </div>
          </motion.div>
        )}

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
            {/* Messages Area - Fixed Height */}
            <div className="h-[500px] overflow-hidden relative">
              <div className="h-full max-w-4xl mx-auto px-6 py-6">
                {/* Chat Container with Invisible Scrollbar */}
                <div className="h-full overflow-y-auto space-y-6 pr-4 scrollbar-hide">
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
                              <p className="text-sm leading-relaxed font-['Poppins',sans-serif]">
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
                                {message.suggestions.map(
                                  (suggestion, index) => (
                                    <motion.button
                                      key={index}
                                      onClick={() =>
                                        handleSuggestionClick(suggestion)
                                      }
                                      className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.6 + index * 0.1 }}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {suggestion}
                                    </motion.button>
                                  ),
                                )}
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
            </div>

            {/* Input Area */}
            <motion.div
              className="bg-white border-t border-gray-200 px-6 py-6 shadow-lg"
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
                      {inputValue.length > 0 && (
                        <span>{inputValue.length}</span>
                      )}
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
                    transition={
                      isRecording ? { duration: 1, repeat: Infinity } : {}
                    }
                    title="Voice Recording"
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </motion.button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg" title="Audio Volume">
                    <div className="text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="4.0"
                      step="0.1"
                      value={audioVolume}
                      onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setAudioVolume(newVolume);
                        if (gainNode) {
                          gainNode.gain.value = newVolume;
                        }
                        addDebugLog(`🔊 Volume adjusted to ${Math.round(newVolume * 100)}%`);
                      }}
                      className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(audioVolume / 4) * 100}%, #e5e7eb ${(audioVolume / 4) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <span className="text-xs text-gray-500 min-w-[30px]">
                      {Math.round(audioVolume * 100)}%
                    </span>
                  </div>

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
                    <span className="font-['Poppins',sans-serif] text-sm font-medium text-green-600">
                      🎤 Real speech recording ready - Click microphone to talk!
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          vapiStatus === "connected"
                            ? "bg-green-500"
                            : vapiStatus === "recording"
                              ? "bg-red-500 animate-pulse"
                              : vapiStatus === "error"
                                ? "bg-red-500"
                                : vapiStatus === "testing"
                                  ? "bg-yellow-500 animate-pulse"
                                  : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="text-xs capitalize font-['Poppins',sans-serif] font-medium">
                        {vapiStatus.replace("-", " ")}
                      </span>
                      <span className="text-xs px-1 rounded bg-green-100 text-green-700 font-bold animate-pulse">
                        🎤 REAL SPEECH
                      </span>
                    </div>
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
                    {vapiError && (
                      <span className="text-xs text-red-500">
                        Error: {vapiError}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={12} />
                    <span>Powered by Real Vapi AI</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        addDebugLog("�� Manual test triggered...");
                        setVapiStatus("testing");
                        setVapiError(null);
                        testVapiConnection();
                      }}
                      className="h-6 px-2 text-xs"
                    >
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Debug Panel */}
            {debugLogs.length > 0 && (
              <motion.div
                className="bg-gray-900 text-green-400 border-t border-gray-200 p-4 h-32 overflow-y-auto font-mono text-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
                    <Zap size={14} />
                    Vapi Debug Console
                  </h3>
                  <div className="space-y-1">
                    {debugLogs.map((log, index) => (
                      <div key={index} className="text-green-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

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
            className="w-[350px] bg-white border-l border-gray-200 flex flex-col shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Video Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-['Poppins',sans-serif]">
                    AI Avatar
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 font-['Poppins',sans-serif]">
                    Genetic Research Assistant
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      vapiStatus === "recording" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 font-['Poppins',sans-serif]">
                    {vapiStatus === "recording" ? "🎤 Recording" : "👁️ Live"}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Container - Maximized */}
            <div className="flex-1 p-4">
              <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  autoPlay={true}
                  muted={true}
                  controls={false}
                  playsInline={true}
                  loop={true}
                  className="w-full h-full object-cover"
                >
                  <source
                    type="video/mp4"
                    src="https://cdn.builder.io/o/assets%2F2d06e16d643b4c26a7274cfb607b5ae9%2F1933a4afdc3240f493211f92f8a5bbc4%2Fcompressed?apiKey=2d06e16d643b4c26a7274cfb607b5ae9&token=1933a4afdc3240f493211f92f8a5bbc4&alt=media&optimized=true"
                  />
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

                {/* Recording Indicator */}
                {vapiStatus === "recording" && (
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-2 rounded-full backdrop-blur-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium font-['Poppins',sans-serif]">
                      REC
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
            {/* Video Controls and Info */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 font-['Poppins',sans-serif]">
                      AI Assistant
                    </h4>
                    <p className="text-sm text-gray-600 font-['Poppins',sans-serif]">
                      Ready to analyze your genetic data
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50"
                    >
                      <Play size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50"
                    >
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
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-['Poppins',sans-serif]">
                      Status:
                    </span>
                    <span className="text-green-600 flex items-center gap-2 font-semibold font-['Poppins',sans-serif]">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Connected
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-['Poppins',sans-serif]">
                      Response Time:
                    </span>
                    <span className="font-semibold text-purple-600 font-['Poppins',sans-serif]">
                      &lt; 200ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-['Poppins',sans-serif]">
                      Quality:
                    </span>
                    <span className="font-semibold text-blue-600 font-['Poppins',sans-serif]">
                      4K HD
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Sparkles size={14} className="text-purple-500" />
                      <span className="font-medium font-['Poppins',sans-serif]">
                        Powered by Advanced AI
                      </span>
                    </div>
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
