# Quick Start Guide

Get the Student Performance Analytics application running in 5 minutes.

## Prerequisites Check

- ✅ Node.js v18+ installed
- ✅ MySQL 8.0+ installed and running
- ✅ CSV dataset file (or use seed.sql)

## Step-by-Step Setup

### 1. Database Setup (2 minutes)

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database and table
CREATE DATABASE IF NOT EXISTS student_performance;
USE student_performance;

-- Copy and paste the CREATE TABLE statement from databaseConfig.md
-- Then import your data using one of these methods:
```

**Quick Test Option (using seed.sql):**
```bash
mysql -u root -p student_performance < seed.sql
```

### 2. Backend Setup (1 minute)

```bash
cd backend
npm install
```

Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=student_performance
DB_PORT=3306
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

✅ Backend should be running on http://localhost:3001

### 3. Frontend Setup (1 minute)

Open a **new terminal**:

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

✅ Frontend should be running on http://localhost:5173

### 4. Access Application

Open browser: **http://localhost:5173**

You should see:
- Data table with 50 rows
- Pagination controls
- Three charts displaying analytics

## Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Verify `.env` credentials
- Ensure database exists

**Frontend can't connect:**
- Verify backend is running on port 3001
- Check browser console for errors
- Verify CORS settings in backend

**Charts not showing:**
- Check browser console
- Verify API endpoints return data
- Test: `curl http://localhost:3001/api/analytics/avg-exam-by-cluster`

## Next Steps

- Import your full CSV dataset (see `databaseConfig.md`)
- Customize charts and styling
- Add more analytics endpoints
- Deploy to production

For detailed documentation, see `README.md`.

