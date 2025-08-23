import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import ClassView from "./pages/ClassView";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import ComputerVision from "./pages/ComputerVision";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
            <Route path="/dashboard2/students" element={<Dashboard2 />} />
            <Route path="/dashboard2/calendar" element={<Dashboard2 />} />
            <Route path="/dashboard2/chatbot" element={<Chatbot />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/chatbot" element={<Chatbot />} />
            <Route
              path="/dashboard/computer-vision"
              element={<ComputerVision />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
