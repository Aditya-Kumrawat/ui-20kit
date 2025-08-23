import { Toaster } from "@/components/ui/toaster";
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
import Calendar from "./pages/Calendar";
import MyTests from "./pages/MyTests";
import TestTaking from "./pages/TestTaking";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import TeacherClassroom from "./pages/TeacherClassroom";

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
            <Route path="/dashboard2/class/:classId" element={<ClassView />} />
            <Route path="/dashboard2/students" element={<Dashboard2 />} />
            <Route path="/dashboard2/calendar" element={<Calendar />} />
            <Route path="/dashboard2/tests" element={<MyTests />} />
            <Route path="/dashboard2/test/:testId" element={<TestTaking />} />
            <Route path="/dashboard2/chatbot" element={<Chatbot />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route path="/dashboard/tests" element={<MyTests />} />
            <Route path="/dashboard/test/:testId" element={<TestTaking />} />
            <Route path="/dashboard/chatbot" element={<Chatbot />} />
            <Route path="/dashboard/community" element={<Community />} />
            <Route path="/dashboard/classroom" element={<TeacherClassroom />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
