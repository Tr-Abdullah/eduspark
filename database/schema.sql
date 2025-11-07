-- EDUSPARK Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Progress Table
CREATE TABLE IF NOT EXISTS course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id, lesson_id)
);

-- Performance Reports Table
CREATE TABLE IF NOT EXISTS performance_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_name TEXT NOT NULL,
  school_name TEXT NOT NULL,
  criteria_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_progress_student 
  ON course_progress(student_id);

CREATE INDEX IF NOT EXISTS idx_course_progress_course 
  ON course_progress(course_id);

CREATE INDEX IF NOT EXISTS idx_performance_reports_created 
  ON performance_reports(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access (you can modify based on your needs)
CREATE POLICY "Enable read access for all users" ON students
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON students
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON course_progress
  FOR SELECT USING (true);

CREATE POLICY "Enable insert/update for all users" ON course_progress
  FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON performance_reports
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON performance_reports
  FOR INSERT WITH CHECK (true);

-- Sample data (optional)
-- INSERT INTO students (name, email) VALUES 
--   ('أحمد محمد', 'ahmed@example.com'),
--   ('فاطمة علي', 'fatima@example.com');
