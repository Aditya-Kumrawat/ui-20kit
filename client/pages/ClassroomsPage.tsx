import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Users, 
  Search,
  Filter,
  Grid,
  List,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  getTeacherClassrooms, 
  getStudentClassrooms,
  getClassroomStats 
} from '../lib/classroomOperations';
import { Classroom, ClassroomStats } from '../types/classroom';
import { ClassroomCard } from '../components/ClassroomCard';
import { ClassroomCreator } from '../components/ClassroomCreator';
import { ClassroomJoin } from '../components/ClassroomJoin';
import { ClassroomDashboard } from './ClassroomDashboard';
import { FloatingSidebar } from '../components/FloatingSidebar';
import { useSidebar } from '../contexts/SidebarContext';

export const ClassroomsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomStats, setClassroomStats] = useState<Record<string, ClassroomStats>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreator, setShowCreator] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get user role from localStorage
  const userRole = currentUser ? localStorage.getItem(`user_${currentUser.uid}_role`) : null;
  const isTeacher = userRole === 'teacher';

  useEffect(() => {
    if (currentUser) {
      loadClassrooms();
    }
  }, [currentUser]);

  const loadClassrooms = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      console.log('Loading classrooms for user:', currentUser.uid, 'isTeacher:', isTeacher);
      
      const classroomsData = isTeacher 
        ? await getTeacherClassrooms(currentUser.uid)
        : await getStudentClassrooms(currentUser.uid);

      console.log('Loaded classrooms:', classroomsData);
      setClassrooms(classroomsData);

      // Load stats for each classroom if user is teacher
      if (isTeacher) {
        const stats: Record<string, ClassroomStats> = {};
        for (const classroom of classroomsData) {
          try {
            stats[classroom.id] = await getClassroomStats(classroom.id);
          } catch (error) {
            console.error(`Error loading stats for classroom ${classroom.id}:`, error);
            // Set default stats if loading fails
            stats[classroom.id] = {
              totalStudents: 0,
              totalAssignments: 0,
              pendingSubmissions: 0,
              gradedSubmissions: 0,
            };
          }
        }
        setClassroomStats(stats);
      }
    } catch (error) {
      console.error('Error loading classrooms:', error);
      toast({
        title: 'Error',
        description: `Failed to load classrooms: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClassroomClick = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
  };

  const handleBackFromClassroom = () => {
    setSelectedClassroom(null);
    loadClassrooms(); // Refresh data when coming back
  };

  if (selectedClassroom) {
    return (
      <ClassroomDashboard
        classroom={selectedClassroom}
        onBack={handleBackFromClassroom}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <FloatingSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          userType={isTeacher ? 'teacher' : 'student'}
        />
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-800">Loading classrooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <FloatingSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        userType={isTeacher ? 'teacher' : 'student'}
      />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-500/5 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/5 to-pink-500/5 rounded-full blur-3xl translate-x-48 translate-y-48" />
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'ml-20' : 'ml-72'
      }`}>
        <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h1 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              {isTeacher ? 'My Classrooms' : 'Enrolled Classrooms'}
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              {isTeacher 
                ? 'Manage your classrooms and assignments'
                : 'View your enrolled classrooms and assignments'
              }
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">Live updates enabled</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isTeacher ? (
              <motion.button
                onClick={() => setShowCreator(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Create Classroom
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowJoin(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Join Classroom
              </motion.button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search classrooms, teachers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 shadow-lg transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-gray-200/60 shadow-lg">
            <motion.button
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Classrooms Grid/List */}
        {filteredClassrooms.length === 0 ? (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {searchTerm ? 'No classrooms found' : 'No classrooms yet'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all available classrooms'
                  : isTeacher 
                    ? 'Create your first classroom to get started with teaching'
                    : 'Join a classroom using a classroom code to begin learning'
                }
              </p>
              {!searchTerm && (
                <motion.button
                  onClick={() => isTeacher ? setShowCreator(true) : setShowJoin(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg transition-all duration-200"
                >
                  {isTeacher ? 'Create First Classroom' : 'Join Classroom'}
                </motion.button>
              )}
            </motion.div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredClassrooms.map((classroom, index) => (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ClassroomCard
                  classroom={classroom}
                  stats={classroomStats[classroom.id]}
                  isTeacher={isTeacher}
                  onClick={() => handleClassroomClick(classroom)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {classrooms.length > 0 && (
          <motion.div 
            className="mt-12 p-8 bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Overview</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/60"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <p className="text-4xl font-black text-blue-600 mb-2">{classrooms.length}</p>
                <p className="text-gray-700 font-semibold">
                  {isTeacher ? 'Classrooms Created' : 'Classrooms Joined'}
                </p>
              </motion.div>
              {isTeacher && (
                <>
                  <motion.div 
                    className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200/60"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <p className="text-4xl font-black text-green-600 mb-2">
                      {Object.values(classroomStats).reduce((sum, stats) => sum + stats.totalStudents, 0)}
                    </p>
                    <p className="text-gray-700 font-semibold">Total Students</p>
                  </motion.div>
                  <motion.div 
                    className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/60"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <p className="text-4xl font-black text-purple-600 mb-2">
                      {Object.values(classroomStats).reduce((sum, stats) => sum + stats.totalAssignments, 0)}
                    </p>
                    <p className="text-gray-700 font-semibold">Total Assignments</p>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
        </div>
      </div>

      {/* Modals */}
      <ClassroomCreator
        isOpen={showCreator}
        onClose={() => setShowCreator(false)}
        onClassroomCreated={loadClassrooms}
      />

      <ClassroomJoin
        isOpen={showJoin}
        onClose={() => setShowJoin(false)}
        onClassroomJoined={loadClassrooms}
      />
    </div>
  );
};
