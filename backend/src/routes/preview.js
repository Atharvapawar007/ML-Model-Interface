/**
 * Preview route - returns first 50 rows with specific columns
 * GET /api/preview
 */

import express from 'express';
import { query } from '../db.js';

const router = express.Router();

/**
 * Get preview of first 50 rows
 * Returns: id, StudyHours, Attendance, AssignmentCompletion, ExamScore, FinalGrade, Cluster, Level
 */
router.get('/', async (req, res) => {
  try {
    const sql = `
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
      LIMIT 50
    `;
    
    const results = await query(sql);
    
    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Preview endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch preview data',
      message: error.message
    });
  }
});

export default router;

