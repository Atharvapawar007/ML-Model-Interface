/**
 * Database connection pool module
 * Manages MySQL connection pooling for efficient database operations
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the backend root directory
dotenv.config({ path: join(__dirname, '../.env') });

// Debug: Log environment variables (without showing password)
console.log('🔍 Database Config:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'student_performance',
  port: process.env.DB_PORT || '3306',
  passwordSet: !!process.env.DB_PASS
});

// Helper function to clean environment variable (remove quotes if present)
const cleanEnvVar = (value) => {
  if (!value) return value;
  // Remove surrounding quotes if present
  return value.replace(/^["']|["']$/g, '');
};

// Create connection pool with configuration from environment variables
// Note: Passwords with special characters work without quotes in .env
// If you use quotes in .env, they will be automatically stripped
const pool = mysql.createPool({
  host: cleanEnvVar(process.env.DB_HOST) || 'localhost',
  user: cleanEnvVar(process.env.DB_USER) || 'root',
  password: cleanEnvVar(process.env.DB_PASS) || '',
  database: cleanEnvVar(process.env.DB_NAME) || 'student_performance',
  port: parseInt(cleanEnvVar(process.env.DB_PORT) || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

/**
 * Test database connection
 * @returns {Promise<boolean>} True if connection successful
 */
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Troubleshooting tips:');
    console.error('   1. Verify MySQL is running');
    console.error('   2. Check .env file exists in backend/ directory');
    console.error('   3. Ensure DB_PASS is set correctly (use quotes if password has special chars)');
    console.error('   4. Verify MySQL user has correct permissions');
    console.error('   5. Try: mysql -u root -p to test connection manually');
    return false;
  }
}

/**
 * Execute a query with prepared statement
 * @param {string} query - SQL query with placeholders
 * @param {Array} params - Parameters for the query
 * @returns {Promise<any>} Query results
 */
export async function query(query, params = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;

