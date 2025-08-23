import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { FloatingTopBar } from "@/components/FloatingTopBar";
import { useSidebar } from "@/contexts/SidebarContext";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample classroom data
  const classes: ClassData[] = [
    {
      id: "math-101",
      name: "Advanced Mathematics",
      subject: "Mathematics",
      teacher: "Dr. Sarah Johnson",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      section: "Section A",
      room: "Room 201",
      color: "from-blue-500 to-blue-600",
      coverImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
      studentsCount: 28,
      pendingWork: 3,
      lastActivity: "2 hours ago",
      classCode: "abc123d",
      isPinned: true,
    },
    {
      id: "physics-201",
      name: "Quantum Physics",
      subject: "Physics",
      teacher: "Prof. Michael Chen",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      section: "Section B",
      room: "Lab 305",
      color: "from-purple-500 to-purple-600",
      coverImage:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=200&fit=crop",
      studentsCount: 24,
      pendingWork: 1,
      lastActivity: "5 hours ago",
      classCode: "xyz789e",
    },
    {
      id: "cs-301",
      name: "Artificial Intelligence",
      subject: "Computer Science",
      teacher: "Dr. Emily Rodriguez",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      section: "Section A",
      room: "Lab 104",
      color: "from-green-500 to-green-600",
      coverImage:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      studentsCount: 32,
      pendingWork: 5,
      lastActivity: "1 day ago",
      classCode: "ai2024f",
    },
    {
      id: "eng-102",
      name: "Advanced Literature",
      subject: "English",
      teacher: "Ms. Jessica Taylor",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      section: "Section C",
      room: "Room 156",
      color: "from-red-500 to-red-600",
      coverImage:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
      studentsCount: 22,
      pendingWork: 2,
      lastActivity: "3 days ago",
      classCode: "lit456g",
    },
    {
      id: "chem-201",
      name: "Organic Chemistry",
      subject: "Chemistry",
      teacher: "Dr. Robert Kim",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      section: "Section A",
      room: "Lab 220",
      color: "from-orange-500 to-orange-600",
      coverImage:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop",
      studentsCount: 20,
      pendingWork: 0,
      lastActivity: "1 week ago",
      classCode: "chem789h",
    },
    {
      id: "bio-301",
      name: "Molecular Biology",
      subject: "Biology",
      teacher: "Dr. Maria Santos",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      section: "Section B",
      room: "Lab 315",
      color: "from-teal-500 to-teal-600",
      coverImage:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      studentsCount: 26,
      pendingWork: 1,
      lastActivity: "4 days ago",
      classCode: "bio123i",
    },
  ];

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/dashboard2/class/${classData.id}`)}
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${classData.color} opacity-90`}
        />
        {classData.coverImage && (
          <img
            src={classData.coverImage}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        )}

        {/* Pinned indicator */}
        {classData.isPinned && (
          <div className="absolute top-3 left-3">
            <Pin className="w-4 h-4 text-white fill-white" />
          </div>
        )}

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
            {classData.section} • {classData.teacher}
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Pending work indicator */}
        {classData.pendingWork > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-600 font-medium">
              {classData.pendingWork} assignment
              {classData.pendingWork > 1 ? "s" : ""} due
            </span>
          </div>
        )}

        {/* Quick stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{classData.studentsCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{classData.lastActivity}</span>
          </div>
        </div>

        {/* Teacher info */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Avatar className="w-6 h-6">
            <AvatarImage src={classData.teacherAvatar} />
            <AvatarFallback className="text-xs">
              {classData.teacher
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700 truncate">
            {classData.teacher}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const ClassListItem = ({ classData }: { classData: ClassData }) => (
    <motion.div
      className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/dashboard2/class/${classData.id}`)}
    >
      <div className="flex items-center gap-4">
        {/* Class color indicator */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${classData.color} flex-shrink-0`}
        />

        {/* Class info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {classData.name}
            </h3>
            {classData.isPinned && (
              <Pin className="w-4 h-4 text-gray-400 fill-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {classData.section} • {classData.teacher}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {classData.studentsCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {classData.lastActivity}
            </span>
          </div>
        </div>

        {/* Pending work */}
        <div className="flex items-center gap-2">
          {classData.pendingWork > 0 ? (
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700"
            >
              {classData.pendingWork} due
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
            <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here are your enrolled classes.
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
            <Button
              variant="outline"
              onClick={() => {
                // Handle join class
                const classCode = prompt("Enter class code:");
                if (classCode) {
                  console.log("Joining class with code:", classCode);
                }
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Join Class
            </Button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {classes.length}
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
                  {classes.reduce((total, cls) => total + cls.pendingWork, 0)}
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
                <p className="text-2xl font-bold text-gray-900">24</p>
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
                  {classes.reduce((total, cls) => total + cls.studentsCount, 0)}
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
