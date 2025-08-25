import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { FloatingTopBar } from "@/components/FloatingTopBar";
import { AssignmentDetailModal } from "@/components/AssignmentDetailModal";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Plus,
  MoreVertical,
  BookOpen,
  Users,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Pin,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStudentPendingAssignments, joinClassroom, getStudentClassrooms, getStudentDashboardStats } from "@/lib/classroomOperations";
import { ClassroomAssignment, Classroom } from "@/types/classroom";

interface ClassData {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  teacherAvatar?: string;
  section: string;
  room?: string;
  color: string;
  coverImage?: string;
  studentsCount: number;
  pendingWork: number;
  lastActivity: string;
  classCode: string;
  isArchived?: boolean;
  isPinned?: boolean;
}

export default function Dashboard2() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [joinClassOpen, setJoinClassOpen] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState<Classroom[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<ClassroomAssignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<ClassroomAssignment | null>(null);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalClasses: 0,
    pendingWork: 0,
    completedAssignments: 0,
    totalClassmates: 0
  });

  // Load student data
  useEffect(() => {
    if (currentUser) {
      loadStudentData();
    }
  }, [currentUser]);

  const loadStudentData = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Load dashboard stats (includes all metrics)
      const stats = await getStudentDashboardStats(currentUser.uid);
      setDashboardStats(stats);
      
      // Load pending assignments
      const assignments = await getStudentPendingAssignments(currentUser.uid);
      setPendingAssignments(assignments);
      
      // Load enrolled classrooms
      const classrooms = await getStudentClassrooms(currentUser.uid);
      setEnrolledClasses(classrooms);
      
    } catch (error) {
      console.error('Error loading student data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No due date';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle join class functionality
  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class code",
        variant: "destructive",
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to join a class",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);

    try {
      await joinClassroom(
        currentUser.uid,
        currentUser.displayName || currentUser.email || 'Unknown Student',
        currentUser.email || '',
        classCode.trim()
      );
      
      toast({
        title: "Success",
        description: "Successfully joined the classroom!",
      });
      
      setClassCode("");
      setJoinClassOpen(false);
      loadStudentData(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join classroom",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const filteredClasses = enrolledClasses.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.classCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ClassCard = ({ classData }: { classData: Classroom }) => (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/dashboard2/class/${classData.id}`)}
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-90`}
        />
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-60" />

        {/* Pinned indicator - placeholder */}
        <div className="absolute top-3 left-3">
          <BookOpen className="w-4 h-4 text-white" />
        </div>

        {/* More options */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Class name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg truncate">
            {classData.name}
          </h3>
          <p className="text-white/80 text-sm">
            {classData.description || 'No description'}
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Pending work indicator */}
        {pendingAssignments.filter(a => a.classroomId === classData.id).length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-600 font-medium">
              {pendingAssignments.filter(a => a.classroomId === classData.id).length} assignment
              {pendingAssignments.filter(a => a.classroomId === classData.id).length > 1 ? "s" : ""} due
            </span>
          </div>
        )}

        {/* Quick stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>Class Code: {classData.classCode}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Active</span>
          </div>
        </div>

        {/* Teacher info */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">
              {(classData.teacherName || 'T')
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700 truncate">
            {classData.teacherName || 'Teacher'}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const ClassListItem = ({ classData }: { classData: Classroom }) => (
    <motion.div
      className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/dashboard2/class/${classData.id}`)}
    >
      <div className="flex items-center gap-4">
        {/* Class color indicator */}
        <div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"
        />

        {/* Class info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {classData.name}
            </h3>
            {/* Pin functionality can be added later */}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {classData.teacherName || 'Teacher'}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Active
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Recent
            </span>
          </div>
        </div>

        {/* Pending work */}
        <div className="flex items-center gap-2">
          {pendingAssignments.filter(a => a.classroomId === classData.id).length > 0 ? (
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700"
            >
              {pendingAssignments.filter(a => a.classroomId === classData.id).length} due
            </Badge>
          ) : (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>

        {/* More options */}
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            // Handle more options
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        userType="student"
      />
      <FloatingTopBar isCollapsed={isCollapsed} />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-72"} pt-28 p-6`}
        animate={{ marginLeft: isCollapsed ? 80 : 272 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! You have {dashboardStats.pendingWork} pending assignments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Join class button */}
            <Dialog open={joinClassOpen} onOpenChange={setJoinClassOpen}>
              <DialogTrigger asChild>
                {/* <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Join Class
                </Button> */}
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Join a Class</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="classCode">Class Code</Label>
                    <Input
                      id="classCode"
                      placeholder="Enter class code"
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isJoining) {
                          handleJoinClass();
                        }
                      }}
                    />
                    <p className="text-sm text-gray-500">
                      Try these codes: abc123d, xyz789e, hist101a
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setJoinClassOpen(false)}
                      disabled={isJoining}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleJoinClass}
                      disabled={isJoining || !classCode.trim()}
                    >
                      {isJoining ? "Joining..." : "Join Class"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Educational Banner */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200/60">
            <img 
              src="/educational-banner.png" 
              alt="Educational Banner" 
              className="w-full h-36 object-cover object-center"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div> */}
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.totalClasses}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Work</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.pendingWork}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.completedAssignments}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Classmates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.totalClassmates}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Classes list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredClasses.map((classData, index) => (
                <motion.div
                  key={classData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ClassCard classData={classData} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredClasses.map((classData, index) => (
                <motion.div
                  key={classData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ClassListItem classData={classData} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty state */}
        {filteredClasses.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No classes found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Join your first class to get started"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
