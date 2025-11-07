/**
 * ClusterBarChart Component
 * Displays average ExamScore by Cluster as a bar chart
 */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';

function ClusterBarChart({ data, loading, error }) {
  const chartData = data?.map(item => ({
    cluster: `Cluster ${item.cluster}`,
    avgExamScore: item.avgExamScore,
    count: item.count
  })) || [];

  return (
    <ChartContainer title="Average Exam Score by Cluster" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cluster" />
          <YAxis label={{ value: 'Average Exam Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value, name) => [
              name === 'avgExamScore' ? `${value.toFixed(2)}` : value,
              name === 'avgExamScore' ? 'Avg Exam Score' : 'Count'
            ]}
          />
          <Legend />
          <Bar dataKey="avgExamScore" fill="#3b82f6" name="Average Exam Score" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default ClusterBarChart;

