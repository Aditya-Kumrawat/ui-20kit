import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Users, 
  Search,
  Filter,
  Grid,
  List
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
import { FloatingTopBar } from '../components/FloatingTopBar';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FloatingSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          userType={isTeacher ? 'teacher' : 'student'}
        />
        <FloatingTopBar isCollapsed={isCollapsed} />
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading classrooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isTeacher ? 'My Classrooms' : 'Enrolled Classrooms'}
            </h1>
            <p className="text-gray-300">
              {isTeacher 
                ? 'Manage your classrooms and assignments'
                : 'View your enrolled classrooms and assignments'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {isTeacher ? (
              <button
                onClick={() => setShowCreator(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Classroom
              </button>
            ) : (
              <button
                onClick={() => setShowJoin(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Join Classroom
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search classrooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Classrooms Grid/List */}
        {filteredClassrooms.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'No classrooms found' : 'No classrooms yet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : isTeacher 
                  ? 'Create your first classroom to get started'
                  : 'Join a classroom using a classroom code'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => isTeacher ? setShowCreator(true) : setShowJoin(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                {isTeacher ? 'Create First Classroom' : 'Join Classroom'}
              </button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredClassrooms.map((classroom) => (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{classrooms.length}</p>
                <p className="text-gray-400 text-sm">
                  {isTeacher ? 'Classrooms Created' : 'Classrooms Joined'}
                </p>
              </div>
              {isTeacher && (
                <>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {Object.values(classroomStats).reduce((sum, stats) => sum + stats.totalStudents, 0)}
                    </p>
                    <p className="text-gray-400 text-sm">Total Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">
                      {Object.values(classroomStats).reduce((sum, stats) => sum + stats.totalAssignments, 0)}
                    </p>
                    <p className="text-gray-400 text-sm">Total Assignments</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
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
