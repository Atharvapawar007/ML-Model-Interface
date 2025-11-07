# Student Performance Analytics - Full Stack Application

A comprehensive full-stack web application for analyzing and visualizing student performance data. Built with React, Express.js, MySQL, and modern charting libraries.

## 🚀 Tech Stack

- **Backend**: Node.js (v18+), Express.js
- **Database**: MySQL 8.0+
- **Frontend**: React (Vite), Tailwind CSS
- **Charts**: Recharts
- **Dev Tools**: dotenv, nodemon, axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v18 or higher
- MySQL 8.0 or higher
- npm or yarn
- A CSV file with student performance data (or use the provided seed.sql)

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

Navigate to the project directory:
```bash
cd "D:\APL WebPage"
```

### 2. Database Setup

#### Step 1: Create Database and Table

Open MySQL and run the SQL from `databaseConfig.md`:

```sql
CREATE DATABASE IF NOT EXISTS student_performance;
USE student_performance;

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

#### Step 2: Import Data

**Option A: Using LOAD DATA (MySQL Command Line)**
```sql
SET GLOBAL local_infile = 1;
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

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your server
3. Select `student_performance` database
4. Right-click `student_data` table → Table Data Import Wizard
5. Follow the wizard to import your CSV

**Option C: Using seed.sql (Quick Testing)**
```bash
mysql -u root -p student_performance < seed.sql
```

For detailed instructions, see `databaseConfig.md`.

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=your_password
# DB_NAME=student_performance
# DB_PORT=3306
# PORT=3001
# FRONTEND_URL=http://localhost:5173
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Edit .env if backend URL differs
# VITE_API_URL=http://localhost:3001/api
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
APL WebPage/
├── backend/
│   ├── src/
│   │   ├── db.js              # Database connection pool
│   │   └── routes/
│   │       ├── preview.js     # Preview endpoint
│   │       ├── rows.js        # Pagination endpoint
│   │       └── analytics.js   # Analytics endpoints
│   ├── server.js              # Express server
│   ├── .env.example           # Environment variables template
│   ├── .eslintrc.json         # ESLint config
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API service
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── databaseConfig.md          # Database setup guide
├── seed.sql                   # Sample data for testing
└── README.md                  # This file
```

## 🔌 API Endpoints

### Data Endpoints
- `GET /api/preview` - Get first 50 rows
- `GET /api/rows?page=1&pageSize=50` - Get paginated rows

### Analytics Endpoints
- `GET /api/analytics/avg-exam-by-cluster` - Average ExamScore by Cluster
- `GET /api/analytics/level-distribution` - Count by Level
- `GET /api/analytics/study-hours-buckets` - Average ExamScore by StudyHours buckets

## 🧪 Testing

### Manual Testing Plan

1. **Backend API Testing**
   - Test `/api/preview` returns 50 rows
   - Test `/api/rows?page=1&pageSize=50` pagination
   - Test all analytics endpoints return data
   - Test error handling (invalid page numbers, etc.)

2. **Frontend Testing**
   - Verify table displays 50 rows
   - Test pagination controls
   - Verify all charts load and display data
   - Test loading states
   - Test error states (disconnect backend)
   - Test responsive design on mobile

3. **Integration Testing**
   - Verify frontend can communicate with backend
   - Test CORS settings
   - Verify data consistency between endpoints

### Quick Test Commands

```bash
# Test backend health
curl http://localhost:3001/health

# Test preview endpoint
curl http://localhost:3001/api/preview

# Test analytics
curl http://localhost:3001/api/analytics/avg-exam-by-cluster
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as a template
   - Add `.env` to `.gitignore`

2. **Database Security**
   - Use prepared statements (already implemented)
   - Validate all input parameters
   - Use connection pooling (already implemented)
   - Restrict database user permissions

3. **API Security**
   - CORS is configured for specific frontend URL
   - Input validation on query parameters
   - Error messages don't expose sensitive information

4. **General**
   - Keep dependencies updated
   - Use HTTPS in production
   - Implement rate limiting for production
   - Add authentication/authorization if needed

## 📝 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password_here
DB_NAME=student_performance
DB_PORT=3306
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
- Verify MySQL is running
- Check `.env` credentials
- Ensure database exists
- Check MySQL user permissions

**Port Already in Use**
- Change `PORT` in `.env`
- Kill process using port 3001

### Frontend Issues

**Cannot Connect to Backend**
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend

**Charts Not Displaying**
- Check browser console for errors
- Verify API endpoints return data
- Check network tab for failed requests

### Database Issues

**Import Failed**
- Verify CSV format matches schema
- Check column order
- Ensure no special characters in data
- Try using MySQL Workbench import wizard

## 📚 Additional Documentation

- `backend/README.md` - Backend-specific documentation
- `frontend/README.md` - Frontend-specific documentation
- `databaseConfig.md` - Detailed database setup guide

## 🚀 Production Deployment

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Set production environment variables
3. Use a process manager (PM2, systemd) for backend
4. Configure reverse proxy (nginx) for frontend
5. Use HTTPS
6. Set up database backups
7. Monitor logs and errors

## 📄 License

This project is provided as-is for educational purposes.

## 👥 Contributing

This is a demonstration project. For production use, consider:
- Adding authentication
- Implementing caching
- Adding more comprehensive error handling
- Writing unit and integration tests
- Adding API documentation (Swagger/OpenAPI)

