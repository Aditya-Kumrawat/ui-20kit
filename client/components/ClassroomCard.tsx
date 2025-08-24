import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, Copy, Check } from "lucide-react";
import { Classroom, ClassroomStats } from "../types/classroom";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

interface ClassroomCardProps {
  classroom: Classroom;
  stats?: ClassroomStats;
  isTeacher?: boolean;
  onClick?: () => void;
}

export const ClassroomCard: React.FC<ClassroomCardProps> = ({
  classroom,
  stats,
  isTeacher = false,
  onClick,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyClassCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(classroom.classCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Classroom code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy classroom code",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.seconds) return "Recently";
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px) saturate(150%)",
        WebkitBackdropFilter: "blur(8px) saturate(150%)",
        border: "1px solid rgba(200, 200, 200, 0.6)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3
              className="font-semibold text-gray-900 text-lg"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {classroom.name}
            </h3>
            <p className="text-gray-600 text-sm">{classroom.teacherName}</p>
          </div>
        </div>

        {isTeacher && (
          <button
            onClick={copyClassCode}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-mono text-gray-700 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {classroom.classCode}
          </button>
        )}
      </div>

      {classroom.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {classroom.description}
        </p>
      )}

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              {stats.totalStudents} student
              {stats.totalStudents !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">
              {stats.totalAssignments} assignment
              {stats.totalAssignments !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Created {formatDate(classroom.createdAt)}</span>
        {isTeacher && stats && stats.pendingSubmissions > 0 && (
          <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
            {stats.pendingSubmissions} pending
          </span>
        )}
      </div>
    </motion.div>
  );
};
