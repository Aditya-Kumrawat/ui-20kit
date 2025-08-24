import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Paperclip,
} from 'lucide-react';
import { ClassroomAssignment, StudentSubmission } from '@/types/classroom';
import { getAssignmentSubmissions } from '@/lib/classroomOperations';
import { downloadFile } from '@/lib/supabaseStorage';
import { debugSubmissions, testSubmissionRetrieval } from '@/lib/debugSubmissions';

interface AssignmentSubmissionsModalProps {
  assignment: ClassroomAssignment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentSubmissionsModal: React.FC<AssignmentSubmissionsModalProps> = ({
  assignment,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (assignment && isOpen) {
      loadSubmissions();
    }
  }, [assignment, isOpen]);

  const loadSubmissions = async () => {
    if (!assignment) return;
    
    setLoading(true);
    try {
      console.log('Loading submissions for assignment:', assignment.id);
      
      // Debug: Check all submissions in database
      await debugSubmissions(assignment.id);
      
      // Test direct retrieval
      const testResults = await testSubmissionRetrieval(assignment.id);
      console.log('Direct test results:', testResults);
      
      const submissionsData = await getAssignmentSubmissions(assignment.id);
      console.log('Submissions loaded via getAssignmentSubmissions:', submissionsData);
      setSubmissions(submissionsData);
      
      if (submissionsData.length === 0) {
        console.log('No submissions found for assignment:', assignment.id);
        // Show debug info in toast for now
        toast({
          title: 'Debug Info',
          description: `No submissions found for assignment ID: ${assignment.id}. Check console for details.`,
        });
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load student submissions',
        variant: 'destructive',
      });
      setSubmissions([]); // Ensure we set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSubmission = async (submission: StudentSubmission) => {
    if (!submission.files || submission.files.length === 0) {
      toast({
        title: 'No Files',
        description: 'This submission has no files to download',
        variant: 'destructive',
      });
      return;
    }

    try {
      const file = submission.files[0]; // Get the first (and only) file
      await downloadFile(file.url, file.name);
      toast({
        title: 'Download Started',
        description: `Downloading ${file.name}...`,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Failed to download the submission file',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAssignmentDate = (timestamp: any) => {
    if (!timestamp) return 'No due date';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!assignment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            Student Submissions
            <Badge className="bg-blue-500/20 text-blue-400">
              {submissions.length} Submitted
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{assignment.title}</h3>
                <p className="text-gray-300 mb-3">{assignment.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Due Date</span>
                </div>
                <p className="text-white font-medium">{formatAssignmentDate(assignment.dueDate)}</p>
              </div>
            </div>

            {/* Assignment Materials */}
            {assignment.materials && assignment.materials.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Assignment Materials
                </h4>
                <div className="flex flex-wrap gap-2">
                  {assignment.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-sm text-white"
                    >
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>{material.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submissions List */}
          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Student Submissions ({submissions.length})
              </h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">No submissions yet</p>
                <p className="text-gray-500 text-sm mt-1">
                  Students haven't submitted their assignments yet
                </p>
                {assignment && (
                  <p className="text-gray-600 text-xs mt-2 font-mono">
                    Assignment ID: {assignment.id}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${submission.studentName}`} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {submission.studentName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">{submission.studentName}</h4>
                            <Badge className={`${
                              submission.status === 'submitted' 
                                ? 'bg-green-500/20 text-green-400'
                                : submission.status === 'graded'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {submission.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Submitted {formatDate(submission.submittedAt)}
                            </span>
                          </div>

                          {/* Submission Files */}
                          {submission.files && submission.files.length > 0 && (
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-2">
                                {submission.files.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-sm"
                                  >
                                    <FileText className="w-4 h-4 text-blue-400" />
                                    <span className="text-white">{file.name}</span>
                                    <span className="text-gray-400">
                                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Submission Content */}
                          {submission.content && (
                            <div className="mt-2 p-3 bg-white/5 rounded-lg">
                              <p className="text-gray-300 text-sm">{submission.content}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {submission.files && submission.files.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadSubmission(submission)}
                            className="text-blue-400 hover:bg-blue-400/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {submission.status === 'submitted' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : submission.status === 'graded' ? (
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
