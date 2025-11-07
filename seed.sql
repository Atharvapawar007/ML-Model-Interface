-- Seed SQL file for quick testing
-- This file contains sample data for testing the application
-- Use this if LOAD DATA is unavailable or for quick setup

USE student_performance;

-- Clear existing data (optional - uncomment if needed)
-- TRUNCATE TABLE student_data;

-- Insert sample data
INSERT INTO student_data (
    StudyHours, Attendance, Resources, Extracurricular, Motivation, Internet,
    Gender, Age, LearningStyle, OnlineCourses, Discussions, AssignmentCompletion,
    ExamScore, EduTech, StressLevel, FinalGrade, Cluster, Level
) VALUES
(12, 85, 1, 1, 7, 1, 1, 20, 2, 1, 3, 90, 78, 1, 5, 82, 1, 'Intermediate'),
(18, 92, 1, 1, 9, 1, 0, 21, 1, 1, 4, 95, 88, 1, 3, 90, 2, 'Advanced'),
(8, 75, 0, 0, 5, 1, 1, 19, 3, 0, 2, 70, 65, 0, 7, 68, 0, 'Beginner'),
(15, 88, 1, 1, 8, 1, 0, 22, 2, 1, 4, 92, 85, 1, 4, 87, 1, 'Intermediate'),
(20, 95, 1, 1, 10, 1, 1, 20, 1, 1, 5, 98, 92, 1, 2, 94, 2, 'Advanced'),
(10, 80, 1, 0, 6, 1, 0, 21, 2, 1, 3, 85, 72, 1, 6, 75, 1, 'Intermediate'),
(6, 70, 0, 0, 4, 0, 1, 19, 3, 0, 1, 60, 55, 0, 8, 58, 0, 'Beginner'),
(16, 90, 1, 1, 8, 1, 1, 22, 1, 1, 4, 93, 86, 1, 4, 89, 2, 'Advanced'),
(14, 85, 1, 1, 7, 1, 0, 20, 2, 1, 3, 88, 80, 1, 5, 83, 1, 'Intermediate'),
(22, 98, 1, 1, 10, 1, 1, 21, 1, 1, 5, 99, 95, 1, 1, 97, 2, 'Advanced'),
(9, 78, 0, 1, 6, 1, 0, 19, 3, 0, 2, 75, 68, 0, 7, 70, 0, 'Beginner'),
(17, 91, 1, 1, 9, 1, 1, 22, 1, 1, 4, 94, 87, 1, 3, 91, 2, 'Advanced'),
(11, 82, 1, 0, 6, 1, 1, 20, 2, 1, 3, 86, 75, 1, 6, 78, 1, 'Intermediate'),
(7, 72, 0, 0, 5, 0, 0, 19, 3, 0, 1, 65, 58, 0, 8, 60, 0, 'Beginner'),
(19, 93, 1, 1, 9, 1, 0, 21, 1, 1, 5, 96, 89, 1, 3, 92, 2, 'Advanced'),
(13, 87, 1, 1, 7, 1, 1, 20, 2, 1, 3, 89, 82, 1, 5, 85, 1, 'Intermediate'),
(5, 68, 0, 0, 4, 0, 1, 18, 3, 0, 1, 58, 52, 0, 9, 55, 0, 'Beginner'),
(21, 96, 1, 1, 10, 1, 1, 22, 1, 1, 5, 97, 93, 1, 2, 95, 2, 'Advanced'),
(12, 83, 1, 0, 6, 1, 0, 20, 2, 1, 3, 87, 76, 1, 6, 79, 1, 'Intermediate'),
(8, 76, 0, 1, 5, 1, 1, 19, 3, 0, 2, 72, 63, 0, 7, 66, 0, 'Beginner');

-- Verify the insert
SELECT COUNT(*) as total_rows FROM student_data;
SELECT * FROM student_data LIMIT 5;

