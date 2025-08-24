import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  Plus, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { uploadSubmissionFile } from '../lib/supabaseStorage';
import { submitAssignment } from '../lib/classroomOperations';
import { ClassroomAssignment, SubmissionFile } from '../types/classroom';

interface StudentSubmissionProps {
  assignment: ClassroomAssignment;
  isOpen: boolean;
  onClose: () => void;
  onSubmissionComplete: () => void;
}

interface FileUploadState {
  file: File | null;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
  url: string | null;
}

export const StudentSubmission: React.FC<StudentSubmissionProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmissionComplete,
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [textSubmission, setTextSubmission] = useState('');
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addFileSlot = () => {
    setFiles(prev => [...prev, {
      file: null,
      uploading: false,
      uploaded: false,
      error: null,
      url: null,
    }]);
  };

  const handleFileSelect = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please upload files smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setFiles(prev => prev.map((fileState, i) => 
      i === index ? { ...fileState, file, uploaded: false, error: null, url: null } : fileState
    ));
  };

  const uploadFile = async (index: number) => {
    const fileState = files[index];
    if (!fileState.file || !currentUser) return;

    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, uploading: true, error: null } : f
    ));

    try {
      const result = await uploadSubmissionFile(
        fileState.file,
        assignment.id,
        currentUser.uid,
        fileState.file.name
      );

      if (result.success) {
        setFiles(prev => prev.map((f, i) => 
          i === index ? { 
            ...f, 
            uploading: false, 
            uploaded: true, 
            url: result.publicUrl 
          } : f
        ));

        toast({
          title: 'File Uploaded',
          description: 'Your file has been uploaded successfully!',
        });
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      setFiles(prev => prev.map((f, i) => 
        i === index ? { 
          ...f, 
          uploading: false, 
          error: error instanceof Error ? error.message : 'Upload failed' 
        } : f
      ));

      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload file',
        variant: 'destructive',
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!currentUser) return;

    const uploadedFiles = files.filter(f => f.uploaded && f.url);
    
    if (!textSubmission.trim() && uploadedFiles.length === 0) {
      toast({
        title: 'Nothing to Submit',
        description: 'Please add text or upload files before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const submissionFiles: SubmissionFile[] = uploadedFiles.map(f => ({
        id: Date.now().toString() + Math.random(),
        name: f.file?.name || 'File',
        url: f.url!,
        size: f.file?.size || 0,
        type: f.file?.type || 'application/octet-stream',
        uploadedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      }));

      await submitAssignment(
        assignment.id,
        currentUser.uid,
        currentUser.displayName || currentUser.email || 'Student',
        {
          files: submissionFiles,
          textSubmission: textSubmission.trim() || undefined,
        }
      );

      toast({
        title: 'Assignment Submitted',
        description: 'Your assignment has been submitted successfully!',
      });

      // Reset form
      setTextSubmission('');
      setFiles([]);
      onSubmissionComplete();
      onClose();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Failed to submit assignment',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.seconds) return 'No due date';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  const isOverdue = () => {
    if (!assignment.dueDate?.seconds) return false;
    return new Date() > new Date(assignment.dueDate.seconds * 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">{assignment.title}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Due: {formatDate(assignment.dueDate)}</span>
              </div>
              {assignment.maxPoints && (
                <span>{assignment.maxPoints} points</span>
              )}
              {isOverdue() && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                  Overdue
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Assignment Description */}
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="font-medium text-white mb-2">Instructions</h3>
          <p className="text-gray-300 text-sm">{assignment.description}</p>
          {assignment.instructions && assignment.instructions !== assignment.description && (
            <p className="text-gray-300 text-sm mt-2">{assignment.instructions}</p>
          )}
        </div>

        {/* Assignment Materials */}
        {assignment.materials && assignment.materials.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3">Assignment Materials</h3>
            <div className="space-y-2">
              {assignment.materials.map((material) => (
                <a
                  key={material.id}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{material.name}</p>
                    <p className="text-gray-400 text-xs">{material.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Text Submission */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Answer (Optional)
          </label>
          <textarea
            value={textSubmission}
            onChange={(e) => setTextSubmission(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Upload Files (Optional)
            </label>
            <button
              onClick={addFileSlot}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add File
            </button>
          </div>

          <div className="space-y-3">
            {files.map((fileState, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                {!fileState.file ? (
                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      onChange={(e) => handleFileSelect(index, e)}
                      className="flex-1 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white text-sm font-medium">{fileState.file.name}</p>
                          <p className="text-gray-400 text-xs">
                            {(fileState.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {fileState.uploaded ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : fileState.error ? (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        ) : null}
                        <button
                          onClick={() => removeFile(index)}
                          disabled={fileState.uploading}
                          className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {fileState.error && (
                      <p className="text-sm text-red-400">{fileState.error}</p>
                    )}

                    {!fileState.uploaded && !fileState.error && (
                      <button
                        onClick={() => uploadFile(index)}
                        disabled={fileState.uploading}
                        className="w-full p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        {fileState.uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload File
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || isOverdue()}
            className="flex-1 p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Assignment
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
