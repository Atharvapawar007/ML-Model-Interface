# Frontend - Student Performance Analytics

React frontend application for visualizing student performance data.

## Prerequisites

- Node.js v18 or higher
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to `http://localhost:3001/api`):
```bash
cp .env.example .env
```

4. Update `.env` if your backend is running on a different URL:
```env
VITE_API_URL=http://localhost:3001/api
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Features

- **Data Table**: Displays student data with pagination (50 rows per page)
- **Charts**:
  - Bar Chart: Average Exam Score by Cluster
  - Pie Chart: Level Distribution
  - Line Chart: Average Exam Score by Study Hours Buckets
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Shows loading indicators while fetching data
- **Error Handling**: Displays error messages if API calls fail

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DataTable.jsx          # Data table component
│   │   ├── Pagination.jsx         # Pagination controls
│   │   ├── ChartContainer.jsx     # Chart wrapper with loading/error states
│   │   ├── ClusterBarChart.jsx    # Bar chart for cluster analysis
│   │   ├── LevelPieChart.jsx      # Pie chart for level distribution
│   │   └── StudyHoursChart.jsx    # Line chart for study hours
│   ├── services/
│   │   └── api.js                 # API service functions
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Custom styles
│   ├── index.css                  # Tailwind CSS imports
│   └── main.jsx                   # Application entry point
├── .env.example                   # Environment variables template
└── package.json                   # Dependencies and scripts
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library for React
- **Axios** - HTTP client for API calls

## Styling

The application uses Tailwind CSS for all styling. The design is:
- Clean and modern
- Fully responsive
- Accessible with proper contrast and semantic HTML

## API Integration

The frontend communicates with the backend API through the `api.js` service module. All API calls are made to endpoints defined in the backend.

Make sure the backend server is running before starting the frontend.
