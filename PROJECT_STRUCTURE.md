# Project Structure

Complete file structure of the Student Performance Analytics application.

```
APL WebPage/
│
├── backend/                          # Backend Node.js/Express application
│   ├── src/
│   │   ├── db.js                     # MySQL connection pool module
│   │   └── routes/
│   │       ├── preview.js            # GET /api/preview endpoint
│   │       ├── rows.js               # GET /api/rows pagination endpoint
│   │       └── analytics.js          # Analytics endpoints
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env.example                  # Environment variables template
│   ├── .eslintrc.json                # ESLint configuration
│   └── README.md                     # Backend documentation
│
├── frontend/                         # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataTable.jsx         # Data table component
│   │   │   ├── Pagination.jsx       # Pagination controls
│   │   │   ├── ChartContainer.jsx   # Chart wrapper with loading/error states
│   │   │   ├── ClusterBarChart.jsx  # Bar chart: Avg ExamScore by Cluster
│   │   │   ├── LevelPieChart.jsx    # Pie chart: Level distribution
│   │   │   └── StudyHoursChart.jsx  # Line chart: Avg ExamScore by StudyHours
│   │   ├── services/
│   │   │   └── api.js                # API service functions (axios)
│   │   ├── App.jsx                   # Main application component
│   │   ├── App.css                   # Custom styles
│   │   ├── index.css                 # Tailwind CSS imports
│   │   └── main.jsx                  # React entry point
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── .env.example                  # Environment variables template
│   └── README.md                     # Frontend documentation
│
├── databaseConfig.md                 # Database setup guide with SQL
├── seed.sql                          # Sample data for quick testing
├── .gitignore                        # Git ignore rules
├── README.md                         # Main project documentation
└── PROJECT_STRUCTURE.md              # This file
```

## Key Files Description

### Backend

- **server.js**: Main Express server, sets up middleware, routes, and starts the server
- **src/db.js**: MySQL connection pool configuration and query helper functions
- **src/routes/preview.js**: Returns first 50 rows for table preview
- **src/routes/rows.js**: Paginated data endpoint with page and pageSize parameters
- **src/routes/analytics.js**: Three analytics endpoints for chart data

### Frontend

- **App.jsx**: Main component that orchestrates all features (table, pagination, charts)
- **components/DataTable.jsx**: Responsive table displaying student data
- **components/Pagination.jsx**: Pagination controls with page numbers
- **components/ClusterBarChart.jsx**: Bar chart using Recharts
- **components/LevelPieChart.jsx**: Pie chart for level distribution
- **components/StudyHoursChart.jsx**: Line chart for study hours analysis
- **services/api.js**: Centralized API service using axios

### Configuration

- **databaseConfig.md**: Complete SQL setup guide, import instructions, and useful queries
- **seed.sql**: Sample data for quick testing without CSV import
- **.env.example**: Template for environment variables (both backend and frontend)

## Dependencies

### Backend
- express: Web framework
- mysql2: MySQL driver with promise support
- dotenv: Environment variable management
- cors: CORS middleware
- nodemon: Development server with auto-reload

### Frontend
- react: UI library
- react-dom: React DOM renderer
- axios: HTTP client
- recharts: Charting library
- tailwindcss: Utility-first CSS framework
- vite: Build tool and dev server

