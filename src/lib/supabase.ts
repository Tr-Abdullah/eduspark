import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type Student = {
  id: string;
  name: string;
  email?: string;
  created_at: string;
};

export type CourseProgress = {
  id: string;
  student_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  score?: number;
  created_at: string;
  updated_at: string;
};

export type PerformanceReport = {
  id: string;
  teacher_name: string;
  school_name: string;
  criteria_data: any;
  created_at: string;
  updated_at: string;
};

// Helper Functions
export async function saveStudentProgress(
  studentId: string,
  courseId: string,
  lessonId: string,
  completed: boolean = true,
  score?: number
) {
  const { data, error } = await supabase
    .from('course_progress')
    .upsert({
      student_id: studentId,
      course_id: courseId,
      lesson_id: lessonId,
      completed,
      score,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error('Error saving progress:', error);
    return null;
  }

  return data;
}

export async function getStudentProgress(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('course_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId);

  if (error) {
    console.error('Error fetching progress:', error);
    return [];
  }

  return data;
}

export async function savePerformanceReport(reportData: Partial<PerformanceReport>) {
  const { data, error } = await supabase
    .from('performance_reports')
    .insert({
      ...reportData,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error('Error saving report:', error);
    return null;
  }

  return data;
}

export async function getPerformanceReports() {
  const { data, error } = await supabase
    .from('performance_reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    return [];
  }

  return data;
}
