import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { FloatingTopBar } from "@/components/FloatingTopBar";
import { useSidebar } from "@/contexts/SidebarContext";
import { PlagiarismDetection } from "@/components/PlagiarismDetection";
import { AnomalyDetection } from "@/components/AnomalyDetection";
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Plus,
  MoreVertical,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  UserCheck,
  ClipboardList,
  PlusCircle,
  CalendarDays,
  BookMarked,
  GraduationCap,
  Shield,
  ScanLine,
  School,
  Folder,
  ChevronRight,
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  status: "draft" | "published" | "graded";
  submissions: number;
  totalStudents: number;
  points: number;
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "inactive";
  lastActive: string;
  grade: string;
  assignments: {
    completed: number;
    pending: number;
    late: number;
  };
}

interface ClassPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  attachments?: string[];
  comments: number;
  type: "announcement" | "material" | "assignment";
}

interface Classroom {
  id: string;
  name: string;
  subject: string;
  students: number;
  color: string;
  lastActivity: string;
  code: string;
  status: "active" | "archived";
}

export default function Dashboard() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { toast } = useToast();

  // State management
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classPosts, setClassPosts] = useState<ClassPost[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedView, setSelectedView] = useState<"overview" | "assignments" | "students" | "posts">("overview");

  // Dialog states
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isPlagiarismOpen, setIsPlagiarismOpen] = useState(false);
  const [isAnomalyOpen, setIsAnomalyOpen] = useState(false);

  // Form states
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    subject: "",
    points: 100,
  });

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "announcement" as "announcement" | "material",
  });

  // Initialize sample data
  useEffect(() => {
    // Sample assignments
    setAssignments([
      {
        id: "1",
        title: "Math Quiz Chapter 5",
        description: "Complete the quiz on algebraic expressions and equations",
        dueDate: "2024-01-15",
        subject: "Mathematics",
        status: "published",
        submissions: 18,
        totalStudents: 25,
        points: 100,
        createdAt: "2024-01-10",
      },
      {
        id: "2",
        title: "Science Lab Report",
        description: "Write a detailed report on the photosynthesis experiment",
        dueDate: "2024-01-20",
        subject: "Science",
        status: "published",
        submissions: 12,
        totalStudents: 25,
        points: 150,
        createdAt: "2024-01-08",
      },
      {
        id: "3",
        title: "History Essay",
        description: "Essay on the causes of World War I",
        dueDate: "2024-01-25",
        subject: "History",
        status: "draft",
        submissions: 0,
        totalStudents: 25,
        points: 200,
        createdAt: "2024-01-12",
      },
    ]);

    // Sample students
    setStudents([
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@school.edu",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
        status: "active",
        lastActive: "2 hours ago",
        grade: "A",
        assignments: { completed: 8, pending: 2, late: 0 },
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@school.edu",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
        status: "active",
        lastActive: "1 day ago",
        grade: "B+",
        assignments: { completed: 7, pending: 2, late: 1 },
      },
      {
        id: "3",
        name: "Charlie Brown",
        email: "charlie.brown@school.edu",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
        status: "inactive",
        lastActive: "3 days ago",
        grade: "B",
        assignments: { completed: 6, pending: 3, late: 1 },
      },
    ]);

    // Sample class posts
    setClassPosts([
      {
        id: "1",
        title: "Welcome to the new semester!",
        content: "I hope everyone is excited for the upcoming semester. Please check the course syllabus and let me know if you have any questions.",
        author: "Dr. Sarah Wilson",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
        createdAt: "2024-01-08",
        comments: 5,
        type: "announcement",
      },
      {
        id: "2",
        title: "Chapter 5 Study Materials",
        content: "I've uploaded additional study materials for Chapter 5. Please review them before our next class.",
        author: "Dr. Sarah Wilson",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
        createdAt: "2024-01-10",
        attachments: ["Chapter5_Notes.pdf", "Practice_Problems.docx"],
        comments: 3,
        type: "material",
      },
    ]);

    // Sample classrooms
    setClassrooms([
      {
        id: "1",
        name: "Advanced Mathematics",
        subject: "Mathematics",
        students: 25,
        color: "bg-blue-500",
        lastActivity: "2 hours ago",
        code: "MATH301",
        status: "active",
      },
      {
        id: "2",
        name: "General Science",
        subject: "Science",
        students: 28,
        color: "bg-green-500",
        lastActivity: "4 hours ago",
        code: "SCI101",
        status: "active",
      },
      {
        id: "3",
        name: "World History",
        subject: "History",
        students: 22,
        color: "bg-purple-500",
        lastActivity: "1 day ago",
        code: "HIST205",
        status: "active",
      },
      {
        id: "4",
        name: "English Literature",
        subject: "English",
        students: 20,
        color: "bg-orange-500",
        lastActivity: "3 days ago",
        code: "ENG102",
        status: "archived",
      },
    ]);
  }, []);

  // Handle new assignment creation
  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
      subject: newAssignment.subject || "General",
      status: "draft",
      submissions: 0,
      totalStudents: 25,
      points: newAssignment.points,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAssignments(prev => [assignment, ...prev]);
    setNewAssignment({ title: "", description: "", dueDate: "", subject: "", points: 100 });
    setIsNewAssignmentOpen(false);

    toast({
      title: "Assignment Created",
      description: "Your assignment has been saved as a draft",
    });
  };

  // Handle new post creation
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const post: ClassPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: "Dr. Sarah Wilson",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
      createdAt: new Date().toISOString().split('T')[0],
      comments: 0,
      type: newPost.type,
    };

    setClassPosts(prev => [post, ...prev]);
    setNewPost({ title: "", content: "", type: "announcement" });
    setIsNewPostOpen(false);

    toast({
      title: "Post Created",
      description: "Your post has been published to the class",
    });
  };

  // Dashboard stats
  const dashboardStats = {
    totalStudents: students.length,
    activeAssignments: assignments.filter(a => a.status === "published").length,
    pendingSubmissions: assignments.reduce((acc, a) => acc + (a.totalStudents - a.submissions), 0),
    averageGrade: "B+",
  };

  // Main dashboard blocks (2x2 grid)
  const DashboardBlocks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Assignments Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-800">Assignments</CardTitle>
            </div>
            <Dialog open={isNewAssignmentOpen} onOpenChange={setIsNewAssignmentOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  New
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-blue-800">{assignments.length}</div>
              <div className="text-sm text-blue-600">
                {assignments.filter(a => a.status === "published").length} Published • {assignments.filter(a => a.status === "draft").length} Drafts
              </div>
              <div className="space-y-2">
                {assignments.slice(0, 2).map(assignment => (
                  <div key={assignment.id} className="flex items-center justify-between bg-white/60 rounded-lg p-2">
                    <div>
                      <div className="font-medium text-sm">{assignment.title}</div>
                      <div className="text-xs text-gray-600">Due: {assignment.dueDate}</div>
                    </div>
                    <Badge variant={assignment.status === "published" ? "default" : "secondary"}>
                      {assignment.submissions}/{assignment.totalStudents}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedView("assignments")}
                className="w-full text-blue-600 hover:text-blue-700"
              >
                View All Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Students Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="h-full bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg text-green-800">Students</CardTitle>
            </div>
            <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <UserCheck className="w-4 h-4 mr-1" />
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-800">{students.length}</div>
              <div className="text-sm text-green-600">
                {students.filter(s => s.status === "active").length} Active • {students.filter(s => s.status === "inactive").length} Inactive
              </div>
              <div className="space-y-2">
                {students.slice(0, 2).map(student => (
                  <div key={student.id} className="flex items-center gap-2 bg-white/60 rounded-lg p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{student.name}</div>
                      <div className="text-xs text-gray-600">Grade: {student.grade}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${student.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedView("students")}
                className="w-full text-green-600 hover:text-green-700"
              >
                View All Students
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Posts Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="h-full bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg text-purple-800">Class Posts</CardTitle>
            </div>
            <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-purple-800">{classPosts.length}</div>
              <div className="text-sm text-purple-600">
                {classPosts.filter(p => p.type === "announcement").length} Announcements • {classPosts.filter(p => p.type === "material").length} Materials
              </div>
              <div className="space-y-2">
                {classPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-white/60 rounded-lg p-2">
                    <div className="font-medium text-sm line-clamp-1">{post.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span>{post.createdAt}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedView("posts")}
                className="w-full text-purple-600 hover:text-purple-700"
              >
                View All Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Your Classrooms Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="h-full bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-lg text-orange-800">Your Classrooms</CardTitle>
            </div>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
              <Folder className="w-4 h-4 mr-1" />
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-orange-800">{classrooms.filter(c => c.status === "active").length}</div>
              <div className="text-sm text-orange-600">
                {classrooms.filter(c => c.status === "active").length} Active • {classrooms.filter(c => c.status === "archived").length} Archived
              </div>
              <div className="space-y-2">
                {classrooms.slice(0, 2).map(classroom => (
                  <div key={classroom.id} className="flex items-center justify-between bg-white/60 rounded-lg p-2 hover:bg-white/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${classroom.color}`} />
                      <div>
                        <div className="font-medium text-sm">{classroom.name}</div>
                        <div className="text-xs text-gray-600">{classroom.students} students • {classroom.code}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-orange-600 hover:text-orange-700"
              >
                View All Classrooms
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FloatingSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <FloatingTopBar isCollapsed={isCollapsed} />

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
            <h1 className="text-3xl font-bold text-gray-900 dashboard-title">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 mt-1 dashboard-text">
              Manage your classes, assignments, and student progress
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlagiarismOpen(true)}
            >
              <ScanLine className="w-4 h-4 mr-2" />
              Plagiarism Check
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnomalyOpen(true)}
            >
              <Shield className="w-4 h-4 mr-2" />
              AI Monitoring
            </Button>
            <Button variant="outline" size="sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.activeAssignments}</p>
                  <p className="text-sm text-gray-600">Active Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.pendingSubmissions}</p>
                  <p className="text-sm text-gray-600">Pending Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.averageGrade}</p>
                  <p className="text-sm text-gray-600">Average Grade</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main 4-Block Dashboard */}
        <DashboardBlocks />

        {/* Two Column Layout with Image and Stats */}
        <div className="mb-8">
          <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
            {/* Left Column - Image */}
            <div className="flex flex-col w-1/2 max-lg:w-full">
              <div
                className="flex flex-col relative mt-5 h-[365px] bg-cover bg-center bg-no-repeat border-none rounded-2xl"
                style={{
                  backgroundImage:
                    "url(https://cdn.builder.io/api/v1/file/assets%2F3ef4243ecdf248dabd75417d35606fac%2F54bd8a0dcac741cabf36c1fc34c597e2)",
                }}
              >
                {/* Transparent glass overlay with text at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm rounded-b-lg p-6">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 dashboard-title">
                      Business Analytics
                    </h2>
                    <p className="text-gray-600 text-sm dashboard-text">
                      Monitor your business performance with real-time insights
                      and comprehensive data visualization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Stats */}
            <div className="flex flex-col w-1/2 ml-5 max-lg:w-full max-lg:ml-0">
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Glass effect card with soft off-white background */}
                    <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/30 overflow-hidden">
                      {/* Soft lift effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl"></div>
                      <div
                        className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bgColor} shadow-sm`}
                          >
                            <stat.icon
                              size={24}
                              className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                            />
                          </div>
                          <div className="text-right">
                            <p
                              className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {stat.change}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3
                            className="text-sm font-medium text-gray-600 mb-1"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {stat.title}
                          </h3>
                          <p
                            className="text-2xl font-bold text-gray-900"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Interactive Animated Graph Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/30">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 dashboard-title">
                Revenue & Orders Trend
              </h3>
              <motion.div
                className="h-80"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="ordersGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#06b6d4"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#06b6d4"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      type="category"
                      allowDataOverflow={false}
                      allowDecimals={true}
                      allowDuplicatedCategory={true}
                      domain={["dataMin", "dataMax"]}
                      scale="auto"
                      interval="preserveStartEnd"
                      tickCount={5}
                      minTickGap={5}
                      height={60}
                      orientation="bottom"
                      mirror={false}
                      reversed={false}
                      hide={false}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      type="number"
                      allowDataOverflow={false}
                      allowDecimals={true}
                      allowDuplicatedCategory={true}
                      domain={["dataMin", "dataMax"]}
                      scale="auto"
                      tickCount={5}
                      minTickGap={5}
                      width={60}
                      orientation="left"
                      mirror={false}
                      reversed={false}
                      hide={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                      labelStyle={{ color: "#374151", fontWeight: "600" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#8b5cf6",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Real Geographical World Map Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dashboard-title">
                Global Business Presence
              </h3>
              <div className="text-sm text-gray-600 dashboard-text">
                Live data from 5 continents
              </div>
            </div>

            <div className="relative">
              {/* Real Geological World Map */}
              <motion.div
                className="relative h-96 rounded-2xl overflow-hidden shadow-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {/* Real World Map using multiple tile sources for reliability */}
                <div className="relative w-full h-full bg-slate-200">
                  {/* Primary map using Natural Earth */}
                  <img
                    src="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/img/data/world.png"
                    alt="World Map"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      filter:
                        "hue-rotate(200deg) saturate(1.2) contrast(1.1) brightness(1.05)",
                    }}
                    onError={(e) => {
                      // Fallback to OpenStreetMap static image
                      const target = e.target as HTMLImageElement;
                      target.src = "https://tile.openstreetmap.org/0/0/0.png";
                      target.style.transform = "scale(4)";
                      target.style.transformOrigin = "center";
                    }}
                  />

                  {/* Fallback: Static world map from MapBox */}
                  <img
                    src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-180,-85,180,85/800x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                    alt="World Map Fallback"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-0"
                    style={{
                      filter:
                        "hue-rotate(200deg) saturate(1.2) contrast(1.1) brightness(1.05)",
                    }}
                    onLoad={(e) => {
                      // Show this as backup if primary fails
                      const target = e.target as HTMLImageElement;
                      const primaryImg =
                        target.previousElementSibling as HTMLImageElement | null;
                      if (
                        primaryImg &&
                        primaryImg.complete &&
                        primaryImg.naturalWidth === 0
                      ) {
                        target.style.opacity = "1";
                      }
                    }}
                    onError={(e) => {
                      // Final fallback: Use a data URL with world map
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                            <div class="text-center text-white">
                              <h3 class="text-xl font-bold mb-2">World Map</h3>
                              <p class="text-sm opacity-90">Global Business Analytics</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />

                  {/* Enhanced overlay with subtle styling */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(45deg, rgba(139, 92, 246, 0.15) 0%, transparent 30%, transparent 70%, rgba(6, 182, 212, 0.15) 100%),
                        radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
                      `,
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Map title overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-md">
                    <h4 className="text-sm font-semibold text-gray-800">
                      Global Coverage
                    </h4>
                    <p className="text-xs text-gray-600">
                      Real-time worldwide data
                    </p>
                  </div>

                  {/* Coordinates grid overlay for authenticity */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "80px 40px",
                    }}
                  />
                </div>
              </motion.div>

              {/* Enhanced Business Metrics */}
              <motion.div
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                {/* Total Global Reach */}
                <motion.div
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-bold text-purple-800 mb-2">
                    Global Reach
                  </h4>
                  <p className="text-2xl font-bold text-purple-900">
                    {mapData
                      .reduce((sum, region) => sum + region.customers, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-purple-600">
                    Total Customers Worldwide
                  </p>
                </motion.div>

                {/* Total Revenue */}
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-bold text-blue-800 mb-2">
                    Global Revenue
                  </h4>
                  <p className="text-2xl font-bold text-blue-900">
                    $
                    {(
                      mapData.reduce((sum, region) => sum + region.revenue, 0) /
                      1000
                    ).toFixed(0)}
                    K
                  </p>
                  <p className="text-sm text-blue-600">
                    Combined Revenue Stream
                  </p>
                </motion.div>

                {/* Average Growth */}
                <motion.div
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-bold text-green-800 mb-2">
                    Growth Rate
                  </h4>
                  <p className="text-2xl font-bold text-green-900">
                    +
                    {(
                      mapData.reduce((sum, region) => sum + region.growth, 0) /
                      mapData.length
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-green-600">
                    Average Global Growth
                  </p>
                </motion.div>
              </motion.div>

              {/* Regional Breakdown */}
              <motion.div
                className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                {mapData.map((region, index) => (
                  <motion.div
                    key={region.region}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-white/30 hover:bg-white/70 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: region.color }}
                      />
                      <div className="text-xs font-medium text-gray-800">
                        {region.region}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>{region.customers.toLocaleString()} customers</div>
                      <div className="text-green-600 font-medium">
                        +{region.growth}% growth
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Additional Content Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/30">
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "New order received",
                    time: "2 minutes ago",
                    user: "Sarah Johnson",
                  },
                  {
                    action: "Payment processed",
                    time: "5 minutes ago",
                    user: "Mike Chen",
                  },
                  {
                    action: "User registered",
                    time: "12 minutes ago",
                    user: "Emma Wilson",
                  },
                  {
                    action: "Product updated",
                    time: "1 hour ago",
                    user: "Admin",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/40 transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium text-gray-800"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        by {activity.user}
                      </p>
                    </div>
                    <p
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/30">
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Conversion Rate
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    3.2%
                  </span>
                </div>
                <Progress value={32} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Customer Satisfaction
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    4.8/5
                  </span>
                </div>
                <Progress value={96} className="h-2" />

                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Server Uptime
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    99.9%
                  </span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
