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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart3,
  Brain,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Sparkles,
  Users,
  Target,
  BookOpen,
  Award,
  RefreshCw,
} from 'lucide-react';
import { ClassroomAssignment, StudentSubmission } from '@/types/classroom';
import { analyzeAllSubmissions } from '@/lib/makeService';
import { saveAnalysisResult, getLatestAnalysisResult, AnalysisResult as StoredAnalysisResult } from '@/lib/analysisStorage';

interface AssignmentAnalysisModalProps {
  assignment: ClassroomAssignment | null;
  submissions: StudentSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentAnalysisModal: React.FC<AssignmentAnalysisModalProps> = ({
  assignment,
  submissions,
  isOpen,
  onClose,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<StoredAnalysisResult | null>(null);
  const { toast } = useToast();

  // Early return if assignment is null to prevent crashes
  if (!assignment) {
    return null;
  }

  // Function to process Gemini analysis results from Make.com
  const processGeminiAnalysis = (analysisResults: any[]) => {
    const validResults = analysisResults.filter(result => result.analysis && !result.error);
    const totalSubmissions = analysisResults.length;
    
    if (validResults.length === 0) {
      return {
        performanceSummary: {
          averageScore: 0,
          totalSubmissions,
          passRate: 0,
        },
        commonMistakes: ['No analysis data available'],
        strengthAreas: ['Unable to determine strengths'],
        improvementSuggestions: ['Please check submission files and try again'],
        gradeDistribution: { excellent: 0, good: 0, average: 0, needsWork: 100 },
        plagiarismFlags: { flaggedSubmissions: 0, suspiciousPatterns: [] }
      };
    }

    // Aggregate Gemini responses - adjust based on your actual JSON structure
    const allAnalyses = validResults.map(r => r.analysis);
    
    // Extract common patterns from Gemini responses
    const mistakes = [];
    const strengths = [];
    const suggestions = [];
    let totalScore = 0;
    let scoreCount = 0;

    for (const analysis of allAnalyses) {
      // Adjust these field names based on your actual Gemini JSON response structure
      if (analysis.mistakes || analysis.common_mistakes || analysis.errors) {
        const analysisMistakes = analysis.mistakes || analysis.common_mistakes || analysis.errors;
        if (Array.isArray(analysisMistakes)) {
          mistakes.push(...analysisMistakes);
        } else if (typeof analysisMistakes === 'string') {
          mistakes.push(analysisMistakes);
        }
      }

      if (analysis.strengths || analysis.positive_aspects || analysis.good_points) {
        const analysisStrengths = analysis.strengths || analysis.positive_aspects || analysis.good_points;
        if (Array.isArray(analysisStrengths)) {
          strengths.push(...analysisStrengths);
        } else if (typeof analysisStrengths === 'string') {
          strengths.push(analysisStrengths);
        }
      }

      if (analysis.suggestions || analysis.improvements || analysis.recommendations) {
        const analysisSuggestions = analysis.suggestions || analysis.improvements || analysis.recommendations;
        if (Array.isArray(analysisSuggestions)) {
          suggestions.push(...analysisSuggestions);
        } else if (typeof analysisSuggestions === 'string') {
          suggestions.push(analysisSuggestions);
        }
      }

      if (analysis.score || analysis.grade || analysis.rating) {
        const score = parseFloat(analysis.score || analysis.grade || analysis.rating);
        if (!isNaN(score)) {
          totalScore += score;
          scoreCount++;
        }
      }
    }

    const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 75;
    const passRate = Math.round((validResults.length / totalSubmissions) * 100);

    // Remove duplicates and get top items
    const uniqueMistakes = [...new Set(mistakes)].slice(0, 5);
    const uniqueStrengths = [...new Set(strengths)].slice(0, 5);
    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);

    // Simple grade distribution based on average
    const excellent = averageScore >= 90 ? 40 : averageScore >= 80 ? 25 : 15;
    const good = averageScore >= 80 ? 35 : averageScore >= 70 ? 30 : 25;
    const average = averageScore >= 70 ? 20 : averageScore >= 60 ? 30 : 35;
    const needsWork = 100 - excellent - good - average;

    return {
      performanceSummary: {
        averageScore,
        totalSubmissions,
        passRate,
      },
      commonMistakes: uniqueMistakes.length > 0 ? uniqueMistakes : ['No specific patterns identified'],
      strengthAreas: uniqueStrengths.length > 0 ? uniqueStrengths : ['Analysis completed successfully'],
      improvementSuggestions: uniqueSuggestions.length > 0 ? uniqueSuggestions : ['Continue current approach'],
      gradeDistribution: { excellent, good, average, needsWork },
      plagiarismFlags: {
        flaggedSubmissions: analysisResults.filter(r => r.error).length,
        suspiciousPatterns: analysisResults.filter(r => r.error).map(r => `${r.studentName}: ${r.error}`)
      }
    };
  };

  useEffect(() => {
    if (assignment && isOpen) {
      // Check for existing analysis results first
      loadExistingAnalysis();
    }
  }, [assignment, isOpen]);

  const loadExistingAnalysis = async () => {
    if (!assignment) return;
    
    try {
      const existingResult = await getLatestAnalysisResult(assignment.id);
      if (existingResult) {
        setAnalysisResult(existingResult);
      } else {
        setAnalysisResult(null);
      }
    } catch (error) {
      console.error('Error loading existing analysis:', error);
      setAnalysisResult(null);
    }
  };

  const handleStartAnalysis = async () => {
    if (!assignment || submissions.length === 0) {
      toast({
        title: 'No Data to Analyze',
        description: 'There are no submissions to analyze for this assignment.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult({
      assignmentId: assignment.id,
      status: 'analyzing',
    });

    try {
      // Prepare submission data for Make.com
      const submissionData = submissions.map(sub => ({
        studentId: sub.studentId,
        studentName: sub.studentName,
        submissionPdfUrl: sub.files?.[0]?.url || '',
        submittedAt: sub.submittedAt?.seconds ? new Date(sub.submittedAt.seconds * 1000).toISOString() : new Date().toISOString(),
      })).filter(sub => sub.submissionPdfUrl); // Only include submissions with files

      if (submissionData.length === 0) {
        throw new Error('No valid PDF submissions found to analyze');
      }

      // Send to Make.com for AI analysis using your existing Gemini scenario
      const analysisResults = await analyzeAllSubmissions(
        assignment.id,
        assignment.title,
        submissionData
      );

      // Process Gemini responses and aggregate results
      const processedResults = processGeminiAnalysis(analysisResults);
      
      // Save results to Firebase
      const savedAnalysisId = await saveAnalysisResult(
        assignment.id,
        assignment.title,
        analysisResults,
        processedResults
      );
      
      // Load the saved result to display
      const savedResult = await getLatestAnalysisResult(assignment.id);
      setAnalysisResult(savedResult);
      setIsAnalyzing(false);
      
      toast({
        title: 'Analysis Complete',
        description: `AI analysis completed and saved for ${analysisResults.length} submissions!`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      // Create a failed analysis result and save it
      const failedResult: Omit<StoredAnalysisResult, 'id'> = {
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        totalSubmissions: submissions.length,
        analyzedSubmissions: 0,
        results: {
          performanceSummary: { averageScore: 0, totalSubmissions: submissions.length, passRate: 0 },
          commonMistakes: ['Analysis failed - please try again'],
          strengthAreas: [],
          improvementSuggestions: [],
          gradeDistribution: { excellent: 0, good: 0, average: 0, needsWork: 100 },
          plagiarismFlags: { flaggedSubmissions: 0, suspiciousPatterns: [] }
        },
        individualAnalyses: [],
        status: 'failed',
        createdAt: { seconds: Math.floor(Date.now() / 1000) } as any,
        updatedAt: { seconds: Math.floor(Date.now() / 1000) } as any
      };
      setAnalysisResult(failedResult as StoredAnalysisResult);
      setIsAnalyzing(false);
      
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze assignments',
        variant: 'destructive',
      });
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisResult?.results) return null;

    const { results } = analysisResult;

    return (
      <div className="space-y-6">
        {/* Performance Summary */}
        {results.performanceSummary && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {results.performanceSummary.averageScore}%
                  </div>
                  <div className="text-sm text-gray-400">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {results.performanceSummary.totalSubmissions}
                  </div>
                  <div className="text-sm text-gray-400">Total Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {results.performanceSummary.passRate}%
                  </div>
                  <div className="text-sm text-gray-400">Pass Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grade Distribution */}
        {results.gradeDistribution && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(results.gradeDistribution).map(([grade, percentage]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{grade.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            grade === 'excellent' ? 'bg-green-500' :
                            grade === 'good' ? 'bg-blue-500' :
                            grade === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-white font-medium w-8">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Common Mistakes */}
        {results.commonMistakes && results.commonMistakes.length > 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Common Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-orange-400 mt-1">•</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Strength Areas */}
        {results.strengthAreas && results.strengthAreas.length > 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" />
                Strength Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.strengthAreas.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Improvement Suggestions */}
        {results.improvementSuggestions && results.improvementSuggestions.length > 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.improvementSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-blue-400 mt-1">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Plagiarism Flags */}
        {results.plagiarismFlags && results.plagiarismFlags.flaggedSubmissions > 0 && (
          <Card className="bg-red-500/10 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Plagiarism Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <span className="text-red-400 font-medium">
                  {results.plagiarismFlags.flaggedSubmissions} submissions flagged
                </span>
              </div>
              <ul className="space-y-2">
                {results.plagiarismFlags.suspiciousPatterns.map((pattern, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-red-400 mt-1">•</span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (!assignment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            AI Assignment Analysis
            <Badge className="bg-purple-500/20 text-purple-400">
              {assignment.title}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              {analysisResult?.status === 'failed' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 mb-2">Analysis Failed</h3>
                  <p className="text-red-600">The analysis could not be completed. Please try again.</p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{assignment.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{submissions.length} submissions</span>
                </div>
              </div>
            </div>
          </div>

          {/* No Analysis Yet */}
          {!analysisResult && !isAnalyzing && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Assignment Analysis</h3>
              <p className="text-gray-400 mb-6">
                Get comprehensive insights about student performance, common mistakes, and improvement suggestions.
              </p>
              <Button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing || submissions.length === 0}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start AI Analysis
              </Button>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing Submissions</h3>
              <p className="text-gray-400">
                Processing {submissions.length} submissions with AI analysis...
              </p>
            </div>
          )}

          {/* Remove this section since we use isAnalyzing state instead */}
          {false && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold text-white mb-2">
                AI is Analyzing Submissions...
              </h3>
              <p className="text-gray-400">
                This may take a few moments. We're processing {submissions.length} submissions.
              </p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && analysisResult.status === 'completed' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Analysis Complete</span>
                  {analysisResult.createdAt && (
                    <p className="text-sm text-gray-500">
                      Generated on {new Date(analysisResult.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleStartAnalysis}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
              </div>
              {renderAnalysisResults()}
            </div>
          )}

          {/* Analysis Error */}
          {analysisResult && analysisResult.status === 'failed' && (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Analysis Failed
              </h3>
              <p className="text-gray-400 mb-4">
                {analysisResult.error || 'Something went wrong during analysis.'}
              </p>
              <Button
                onClick={handleStartAnalysis}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

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
