import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FloatingSidebar } from '@/components/FloatingSidebar';
import { FloatingTopBar } from '@/components/FloatingTopBar';
import { AssignmentCreator } from '@/components/AssignmentCreator';
import { AssignmentDetailModal } from '@/components/AssignmentDetailModal';
import { AssignmentSubmissionsModal } from '@/components/AssignmentSubmissionsModal';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  Users,
  Calendar,
  FileText,
  Clock,
  Check,
  AlertCircle,
  Plus,
  Settings,
  Copy,
  Share2,
  Eye,
  Edit3,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Classroom, ClassroomAssignment, Enrollment, ClassroomStats } from '@/types/classroom';
import { getClassroomStats, getClassroomAssignments, getClassroomEnrollments } from '@/lib/classroomOperations';

interface ClassroomDashboardProps {
  classroom: Classroom;
  onBack: () => void;
}

export const ClassroomDashboard: React.FC<ClassroomDashboardProps> = ({
  classroom,
  onBack,
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<ClassroomStats>({
    totalStudents: 0,
    totalAssignments: 0,
    pendingSubmissions: 0,
    gradedSubmissions: 0,
  });
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignmentCreator, setShowAssignmentCreator] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<ClassroomAssignment | null>(null);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [copied, setCopied] = useState(false);

  const isTeacher = currentUser?.uid === classroom.teacherId;

  useEffect(() => {
    loadClassroomData();
  }, [classroom.id]);

  const loadClassroomData = async () => {
    setLoading(true);
    try {
      const [statsData, assignmentsData, enrollmentsData] = await Promise.all([
        getClassroomStats(classroom.id),
        getClassroomAssignments(classroom.id),
        isTeacher ? getClassroomEnrollments(classroom.id) : Promise.resolve([]),
      ]);

      setStats(statsData);
      setAssignments(assignmentsData);
      setEnrollments(enrollmentsData);
    } catch (error) {
      console.error('Error loading classroom data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load classroom data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyClassCode = async () => {
    try {
      await navigator.clipboard.writeText(classroom.classCode);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Classroom code copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy classroom code',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.seconds) return 'No due date';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp?.seconds) return 'Recently';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{classroom.name}</h1>
              <p className="text-gray-300">{classroom.description}</p>
            </div>
          </div>
          
          {isTeacher && (
            <div className="flex items-center gap-3">
              <button
                onClick={copyClassCode}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="font-mono">{classroom.classCode}</span>
              </button>
              <button
                onClick={() => setShowAssignmentCreator(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Assignment
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
                <p className="text-gray-400 text-sm">Students</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalAssignments}</p>
                <p className="text-gray-400 text-sm">Assignments</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.pendingSubmissions}</p>
                <p className="text-gray-400 text-sm">Pending</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.gradedSubmissions}</p>
                <p className="text-gray-400 text-sm">Graded</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignments */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Assignments
              </h2>
              
              {assignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No assignments yet</p>
                  {isTeacher && (
                    <button
                      onClick={() => setShowAssignmentCreator(true)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                      Create First Assignment
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {assignments.slice(0, 5).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowAssignmentDetail(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{assignment.title}</h3>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {assignment.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>Created {formatDateTime(assignment.createdAt)}</span>
                            {assignment.dueDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Due {formatDate(assignment.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            assignment.status === 'published' 
                              ? 'bg-green-500/20 text-green-400'
                              : assignment.status === 'draft'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {assignment.status}
                          </span>
                          {isTeacher ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAssignment(assignment);
                                setShowSubmissions(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Submissions
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAssignment(assignment);
                                setShowAssignmentDetail(true);
                              }}
                            >
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Students */}
          <div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Students ({enrollments.length})
              </h2>
              
              {enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No students enrolled yet</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Share your classroom code with students
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.slice(0, 8).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {enrollment.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {enrollment.studentName}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {enrollment.studentEmail}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {enrollments.length > 8 && (
                    <p className="text-center text-gray-400 text-xs pt-2">
                      +{enrollments.length - 8} more students
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AssignmentCreator
        isOpen={showAssignmentCreator}
        classroomId={classroom.id}
        onClose={() => setShowAssignmentCreator(false)}
        onAssignmentCreated={loadClassroomData}
      />
      
      <AssignmentDetailModal
        assignment={selectedAssignment}
        isOpen={showAssignmentDetail}
        onClose={() => {
          setShowAssignmentDetail(false);
          setSelectedAssignment(null);
        }}
        isTeacher={isTeacher}
        onAssignmentUpdate={loadClassroomData}
      />
      
      <AssignmentSubmissionsModal
        assignment={selectedAssignment}
        isOpen={showSubmissions}
        onClose={() => {
          setShowSubmissions(false);
          setSelectedAssignment(null);
        }}
      />
    </div>
  );
};
