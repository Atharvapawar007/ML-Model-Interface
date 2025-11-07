/**
 * Analytics routes
 * Provides aggregated data for charts and visualizations
 */

import express from 'express';
import { query } from '../db.js';

const router = express.Router();

/**
 * Average ExamScore grouped by Cluster
 * GET /api/analytics/avg-exam-by-cluster
 */
router.get('/avg-exam-by-cluster', async (req, res) => {
  try {
    const sql = `
      SELECT 
        Cluster,
        AVG(ExamScore) as avgExamScore,
        COUNT(*) as count
      FROM student_data
      GROUP BY Cluster
      ORDER BY Cluster
    `;
    
    const results = await query(sql);
    
    res.json({
      success: true,
      data: results.map(row => ({
        cluster: row.Cluster,
        avgExamScore: row.avgExamScore != null 
          ? parseFloat(Number(row.avgExamScore).toFixed(2)) 
          : 0,
        count: Number(row.count) || 0
      }))
    });
  } catch (error) {
    console.error('Avg exam by cluster error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data',
      message: error.message
    });
  }
});

/**
 * Level distribution (count by Level)
 * GET /api/analytics/level-distribution
 */
router.get('/level-distribution', async (req, res) => {
  try {
    const sql = `
      SELECT 
        Level,
        COUNT(*) as count
      FROM student_data
      GROUP BY Level
      ORDER BY Level
    `;
    
    const results = await query(sql);
    
    res.json({
      success: true,
      data: results.map(row => ({
        level: row.Level,
        count: Number(row.count) || 0
      }))
    });
  } catch (error) {
    console.error('Level distribution error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch level distribution',
      message: error.message
    });
  }
});

/**
 * Average ExamScore by StudyHours buckets
 * GET /api/analytics/study-hours-buckets
 */
router.get('/study-hours-buckets', async (req, res) => {
  try {
    const sql = `
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
      ORDER BY MIN(StudyHours)
    `;
    
    const results = await query(sql);
    
    res.json({
      success: true,
      data: results.map(row => ({
        bucket: row.bucket,
        avgExamScore: row.avgExamScore != null 
          ? parseFloat(Number(row.avgExamScore).toFixed(2)) 
          : 0,
        count: Number(row.count) || 0
      }))
    });
  } catch (error) {
    console.error('Study hours buckets error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch study hours buckets',
      message: error.message
    });
  }
});

export default router;

