/**
 * API service module
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get preview data (first 50 rows)
 */
export const getPreview = async () => {
  try {
    const response = await api.get('/preview');
    return response.data;
  } catch (error) {
    console.error('Error fetching preview:', error);
    throw error;
  }
};

/**
 * Get paginated rows
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Number of rows per page
 */
export const getRows = async (page = 1, pageSize = 50) => {
  try {
    const response = await api.get('/rows', {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rows:', error);
    throw error;
  }
};

/**
 * Get average ExamScore by Cluster
 */
export const getAvgExamByCluster = async () => {
  try {
    const response = await api.get('/analytics/avg-exam-by-cluster');
    return response.data;
  } catch (error) {
    console.error('Error fetching avg exam by cluster:', error);
    throw error;
  }
};

/**
 * Get Level distribution
 */
export const getLevelDistribution = async () => {
  try {
    const response = await api.get('/analytics/level-distribution');
    return response.data;
  } catch (error) {
    console.error('Error fetching level distribution:', error);
    throw error;
  }
};

/**
 * Get StudyHours buckets
 */
export const getStudyHoursBuckets = async () => {
  try {
    const response = await api.get('/analytics/study-hours-buckets');
    return response.data;
  } catch (error) {
    console.error('Error fetching study hours buckets:', error);
    throw error;
  }
};

