/**
 * Main App Component
 * Single Page Application for Student Performance Analytics
 * Features: Data table with pagination, multiple chart visualizations
 */

import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import ClusterBarChart from './components/ClusterBarChart';
import LevelPieChart from './components/LevelPieChart';
import StudyHoursChart from './components/StudyHoursChart';
import {
  getPreview,
  getRows,
  getAvgExamByCluster,
  getLevelDistribution,
  getStudyHoursBuckets
} from './services/api';
import './App.css';

function App() {
  // Table data state
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(50);

  // Chart data states
  const [clusterData, setClusterData] = useState(null);
  const [clusterLoading, setClusterLoading] = useState(true);
  const [clusterError, setClusterError] = useState(null);

  const [levelData, setLevelData] = useState(null);
  const [levelLoading, setLevelLoading] = useState(true);
  const [levelError, setLevelError] = useState(null);

  const [studyHoursData, setStudyHoursData] = useState(null);
  const [studyHoursLoading, setStudyHoursLoading] = useState(true);
  const [studyHoursError, setStudyHoursError] = useState(null);

  // Load preview data on mount
  useEffect(() => {
    loadPreviewData();
    loadChartData();
  }, []);

  // Load paginated data when page changes
  useEffect(() => {
    if (currentPage > 1) {
      loadPaginatedData();
    }
  }, [currentPage]);

  const loadPreviewData = async () => {
    try {
      setTableLoading(true);
      const response = await getPreview();
      if (response.success) {
        setTableData(response.data);
      }
    } catch (error) {
      console.error('Error loading preview:', error);
    } finally {
      setTableLoading(false);
    }
  };

  const loadPaginatedData = async () => {
    try {
      setTableLoading(true);
      const response = await getRows(currentPage, pageSize);
      if (response.success) {
        setTableData(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error('Error loading paginated data:', error);
    } finally {
      setTableLoading(false);
    }
  };

  const loadChartData = async () => {
    // Load cluster data
    try {
      setClusterLoading(true);
      setClusterError(null);
      const response = await getAvgExamByCluster();
      if (response.success) {
        setClusterData(response.data);
      }
    } catch (error) {
      setClusterError(error.message || 'Failed to load cluster data');
      console.error('Error loading cluster data:', error);
    } finally {
      setClusterLoading(false);
    }

    // Load level distribution
    try {
      setLevelLoading(true);
      setLevelError(null);
      const response = await getLevelDistribution();
      if (response.success) {
        setLevelData(response.data);
      }
    } catch (error) {
      setLevelError(error.message || 'Failed to load level distribution');
      console.error('Error loading level distribution:', error);
    } finally {
      setLevelLoading(false);
    }

    // Load study hours buckets
    try {
      setStudyHoursLoading(true);
      setStudyHoursError(null);
      const response = await getStudyHoursBuckets();
      if (response.success) {
        setStudyHoursData(response.data);
      }
    } catch (error) {
      setStudyHoursError(error.message || 'Failed to load study hours data');
      console.error('Error loading study hours data:', error);
    } finally {
      setStudyHoursLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Performance Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Interactive dashboard for analyzing student performance data
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Table Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Student Data Preview
            </h2>
            <DataTable data={tableData} loading={tableLoading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={tableLoading}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <ClusterBarChart
            data={clusterData}
            loading={clusterLoading}
            error={clusterError}
          />
          <LevelPieChart
            data={levelData}
            loading={levelLoading}
            error={levelError}
          />
        </section>

        {/* Study Hours Chart - Full Width */}
        <section className="mb-12">
          <StudyHoursChart
            data={studyHoursData}
            loading={studyHoursLoading}
            error={studyHoursError}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Data Source: Student Performance Dataset | Built with React, Express, and MySQL
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
