import { supabase } from './supabase';

export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

// Upload assignment files (for teachers)
export const uploadAssignmentMaterial = async (
  file: File,
  assignmentId: string,
  fileName?: string
): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName ? `${fileName}.${fileExt}` : file.name;
    const filePath = `assignments/${assignmentId}/${Date.now()}-${finalFileName}`;

    const { data, error } = await supabase.storage
      .from('hackwave-storage')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    const { data: urlData } = supabase.storage
      .from('hackwave-storage')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Upload student submission files
export const uploadSubmissionFile = async (
  file: File,
  assignmentId: string,
  studentId: string,
  fileName?: string
): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName ? `${fileName}.${fileExt}` : file.name;
    const filePath = `submissions/${assignmentId}/${studentId}/${Date.now()}-${finalFileName}`;

    const { data, error } = await supabase.storage
      .from('hackwave-storage')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    const { data: urlData } = supabase.storage
      .from('hackwave-storage')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Upload classroom materials (general)
export const uploadClassroomFile = async (
  file: File,
  classroomId: string,
  folder: string = 'materials',
  fileName?: string
): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName ? `${fileName}.${fileExt}` : file.name;
    const filePath = `classrooms/${classroomId}/${folder}/${Date.now()}-${finalFileName}`;

    const { data, error } = await supabase.storage
      .from('hackwave-storage')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    const { data: urlData } = supabase.storage
      .from('hackwave-storage')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Delete file from storage
export const deleteFile = async (filePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('hackwave-storage')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};
