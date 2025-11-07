# Database Configuration Guide

This document provides SQL scripts and instructions for setting up the MySQL database for the Student Performance Analytics application.

## Table Schema

The dataset contains the following columns:
- `StudyHours` (INT)
- `Attendance` (TINYINT)
- `Resources` (TINYINT)
- `Extracurricular` (TINYINT)
- `Motivation` (TINYINT)
- `Internet` (TINYINT)
- `Gender` (TINYINT)
- `Age` (INT)
- `LearningStyle` (TINYINT)
- `OnlineCourses` (TINYINT)
- `Discussions` (TINYINT)
- `AssignmentCompletion` (TINYINT)
- `ExamScore` (INT)
- `EduTech` (TINYINT)
- `StressLevel` (TINYINT)
- `FinalGrade` (INT)
- `Cluster` (TINYINT)
- `Level` (VARCHAR)

## 1. Create Database and Table

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS student_performance;
USE student_performance;

-- Create table with appropriate types
CREATE TABLE IF NOT EXISTS student_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    StudyHours INT NOT NULL,
    Attendance TINYINT NOT NULL,
    Resources TINYINT NOT NULL,
    Extracurricular TINYINT NOT NULL,
    Motivation TINYINT NOT NULL,
    Internet TINYINT NOT NULL,
    Gender TINYINT NOT NULL,
    Age INT NOT NULL,
    LearningStyle TINYINT NOT NULL,
    OnlineCourses TINYINT NOT NULL,
    Discussions TINYINT NOT NULL,
    AssignmentCompletion TINYINT NOT NULL,
    ExamScore INT NOT NULL,
    EduTech TINYINT NOT NULL,
    StressLevel TINYINT NOT NULL,
    FinalGrade INT NOT NULL,
    Cluster TINYINT NOT NULL,
    Level VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cluster (Cluster),
    INDEX idx_level (Level),
    INDEX idx_exam_score (ExamScore),
    INDEX idx_study_hours (StudyHours)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 2. Import CSV Data

### Option A: Using LOAD DATA LOCAL INFILE (MySQL Command Line)

```sql
-- Enable local file loading (if needed)
SET GLOBAL local_infile = 1;

-- Load data from CSV
LOAD DATA LOCAL INFILE '/path/to/your/dataset.csv'
INTO TABLE student_data
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(StudyHours, Attendance, Resources, Extracurricular, Motivation, Internet, 
 Gender, Age, LearningStyle, OnlineCourses, Discussions, AssignmentCompletion, 
 ExamScore, EduTech, StressLevel, FinalGrade, Cluster, Level);
```

**Note:** Replace `/path/to/your/dataset.csv` with the actual path to your CSV file.

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Select the `student_performance` database
4. Right-click on the `student_data` table
5. Select "Table Data Import Wizard"
6. Choose your CSV file
7. Map columns (skip the header row)
8. Click "Next" and "Finish" to import

### Option C: Using phpMyAdmin

1. Select the `student_performance` database
2. Click on the `student_data` table
3. Go to the "Import" tab
4. Choose your CSV file
5. Set format to CSV
6. Check "The first line contains the table column names"
7. Click "Go" to import

## 3. Index Creation

The indexes are already included in the CREATE TABLE statement above. They are:
- `idx_cluster` - For filtering and grouping by Cluster
- `idx_level` - For filtering and grouping by Level
- `idx_exam_score` - For sorting and aggregating ExamScore
- `idx_study_hours` - For StudyHours bucket queries

If you need to add indexes after table creation:

```sql
CREATE INDEX idx_cluster ON student_data(Cluster);
CREATE INDEX idx_level ON student_data(Level);
CREATE INDEX idx_exam_score ON student_data(ExamScore);
CREATE INDEX idx_study_hours ON student_data(StudyHours);
```

## 4. Useful SQL Queries for Frontend and Charts

### Preview Query (First 50 rows)
```sql
SELECT 
    id,
    StudyHours,
    Attendance,
    AssignmentCompletion,
    ExamScore,
    FinalGrade,
    Cluster,
    Level
FROM student_data
ORDER BY id
LIMIT 50;
```

### Paginated Query
```sql
-- Page 1 (rows 1-50)
SELECT 
    id,
    StudyHours,
    Attendance,
    AssignmentCompletion,
    ExamScore,
    FinalGrade,
    Cluster,
    Level
FROM student_data
ORDER BY id
LIMIT 50 OFFSET 0;

-- Page 2 (rows 51-100)
SELECT 
    id,
    StudyHours,
    Attendance,
    AssignmentCompletion,
    ExamScore,
    FinalGrade,
    Cluster,
    Level
FROM student_data
ORDER BY id
LIMIT 50 OFFSET 50;
```

### Average ExamScore by Cluster
```sql
SELECT 
    Cluster,
    AVG(ExamScore) as avgExamScore,
    COUNT(*) as count
FROM student_data
GROUP BY Cluster
ORDER BY Cluster;
```

### Level Distribution
```sql
SELECT 
    Level,
    COUNT(*) as count
FROM student_data
GROUP BY Level
ORDER BY Level;
```

### StudyHours Buckets
```sql
SELECT 
    CASE
        WHEN StudyHours < 5 THEN '0-4'
        WHEN StudyHours < 10 THEN '5-9'
        WHEN StudyHours < 15 THEN '10-14'
        WHEN StudyHours < 20 THEN '15-19'
        WHEN StudyHours < 25 THEN '20-24'
        ELSE '25+'
    END as bucket,
    AVG(ExamScore) as avgExamScore,
    COUNT(*) as count
FROM student_data
GROUP BY bucket
ORDER BY MIN(StudyHours);
```

### Total Count
```sql
SELECT COUNT(*) as total FROM student_data;
```

### Sample Aggregations
```sql
-- Overall statistics
SELECT 
    AVG(ExamScore) as avgExamScore,
    AVG(StudyHours) as avgStudyHours,
    AVG(Attendance) as avgAttendance,
    AVG(FinalGrade) as avgFinalGrade,
    COUNT(*) as totalStudents
FROM student_data;

-- Cluster statistics
SELECT 
    Cluster,
    COUNT(*) as count,
    AVG(ExamScore) as avgExamScore,
    AVG(StudyHours) as avgStudyHours,
    AVG(FinalGrade) as avgFinalGrade
FROM student_data
GROUP BY Cluster
ORDER BY Cluster;
```

## 5. Verification Queries

After importing data, verify the import:

```sql
-- Check total rows
SELECT COUNT(*) as total_rows FROM student_data;

-- Check sample data
SELECT * FROM student_data LIMIT 5;

-- Check for null values
SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN StudyHours IS NULL THEN 1 ELSE 0 END) as null_study_hours,
    SUM(CASE WHEN ExamScore IS NULL THEN 1 ELSE 0 END) as null_exam_score,
    SUM(CASE WHEN Level IS NULL THEN 1 ELSE 0 END) as null_level
FROM student_data;
```

