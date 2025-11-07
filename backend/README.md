# Backend API - Student Performance Analytics

Express.js backend API for the Student Performance Analytics application.

## Prerequisites

- Node.js v18 or higher
- MySQL 8.0 or higher
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password_here
DB_NAME=student_performance
DB_PORT=3306
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Database Setup

1. Create the database and table using the SQL in `../databaseConfig.md`

2. Import your CSV data using one of the methods described in `../databaseConfig.md`:
   - Using `LOAD DATA LOCAL INFILE`
   - Using MySQL Workbench
   - Using `seed.sql` for quick testing

## Running the Server

### Development Mode (with nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Data Endpoints
- `GET /api/preview` - Get first 50 rows
- `GET /api/rows?page=1&pageSize=50` - Get paginated rows

### Analytics Endpoints
- `GET /api/analytics/avg-exam-by-cluster` - Average ExamScore by Cluster
- `GET /api/analytics/level-distribution` - Count by Level
- `GET /api/analytics/study-hours-buckets` - Average ExamScore by StudyHours buckets

## Project Structure

```
backend/
├── src/
│   ├── db.js              # Database connection pool
│   ├── routes/
│   │   ├── preview.js     # Preview endpoint
│   │   ├── rows.js        # Pagination endpoint
│   │   └── analytics.js   # Analytics endpoints
├── server.js              # Express server entry point
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
└── package.json           # Dependencies and scripts
```

## Security Considerations

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- All database queries use prepared statements to prevent SQL injection
- CORS is configured to allow requests from the frontend URL only
- Input validation is performed on query parameters

## Error Handling

All endpoints return JSON responses with the following structure:
- Success: `{ success: true, data: [...] }`
- Error: `{ success: false, error: "Error message", message: "Detailed message" }`

## Testing

See the main project README for manual testing instructions.

