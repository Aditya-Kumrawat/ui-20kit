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

export default function TeacherClassroom() {
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

      {/* Analytics Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="h-full bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-lg text-orange-800">Class Analytics</CardTitle>
            </div>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-orange-800">{dashboardStats.averageGrade}</div>
              <div className="text-sm text-orange-600">Average Class Grade</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white/60 rounded-lg p-2">
                  <span className="text-sm font-medium">Submission Rate</span>
                  <span className="text-sm font-bold">76%</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 rounded-lg p-2">
                  <span className="text-sm font-medium">Engagement</span>
                  <span className="text-sm font-bold">89%</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full text-orange-600 hover:text-orange-700"
              >
                View Analytics
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
              Teacher Classroom
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

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alice" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm"><strong>Alice Johnson</strong> submitted <em>Math Quiz Chapter 5</em></p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <Badge variant="outline">New Submission</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=bob" />
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm"><strong>Bob Smith</strong> asked a question in <em>Science Lab Report</em></p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                  <Badge variant="outline">Question</Badge>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Reminder: <strong>History Essay</strong> due in 3 days</p>
                    <p className="text-xs text-gray-500">System notification</p>
                  </div>
                  <Badge variant="outline">Reminder</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* New Assignment Dialog */}
      <Dialog open={isNewAssignmentOpen} onOpenChange={setIsNewAssignmentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                placeholder="Enter assignment title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={newAssignment.subject}
                onValueChange={(value) => setNewAssignment(prev => ({ ...prev, subject: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the assignment"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={newAssignment.points}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, points: parseInt(e.target.value) || 100 }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewAssignmentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAssignment} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Class Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="postType">Post Type</Label>
              <Select
                value={newPost.type}
                onValueChange={(value: "announcement" | "material") => setNewPost(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="material">Material</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postTitle">Title *</Label>
              <Input
                id="postTitle"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postContent">Content *</Label>
              <Textarea
                id="postContent"
                placeholder="Write your message to the class"
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost} className="bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4 mr-2" />
                Post to Class
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plagiarism Detection Component */}
      <PlagiarismDetection
        isOpen={isPlagiarismOpen}
        onClose={() => setIsPlagiarismOpen(false)}
      />

      {/* Anomaly Detection Component */}
      <AnomalyDetection
        isOpen={isAnomalyOpen}
        onClose={() => setIsAnomalyOpen(false)}
      />
    </div>
  );
}
