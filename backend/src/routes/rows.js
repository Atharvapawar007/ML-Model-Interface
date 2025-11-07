/**
 * Paginated rows route
 * GET /api/rows?page=1&pageSize=50
 */

import express from 'express';
import { query } from '../db.js';

const router = express.Router();

/**
 * Get paginated rows
 * Query params:
 * - page: page number (default: 1)
 * - pageSize: number of rows per page (default: 50, max: 100)
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = Math.min(parseInt(req.query.pageSize || '50', 10), 100);
    const offset = (page - 1) * pageSize;

    // Validate inputs
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page or pageSize parameters'
      });
    }

    // Get total count
    const countQuery = 'SELECT COUNT(*) as total FROM student_data';
    const [countResult] = await query(countQuery);
    const total = countResult[0].total;

    // Get paginated data
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
      LIMIT ? OFFSET ?
    `;
    
    const results = await query(sql, [pageSize, offset]);
    
    res.json({
      success: true,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: results
    });
  } catch (error) {
    console.error('Rows endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch paginated data',
      message: error.message
    });
  }
});

export default router;

