/**
 * ClusterBarChart Component
 * Displays average ExamScore by Cluster as a bar chart
 */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ChartContainer from './ChartContainer';

// Color palette for clusters - distinct colors
const CLUSTER_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#10b981', // Green
  '#eab308', // Yellow
  '#8b5cf6', // Purple
  '#f97316', // Orange
  '#06b6d4', // Cyan
  '#ec4899', // Pink
];

// Get color for a specific cluster index
const getClusterColor = (index) => {
  return CLUSTER_COLORS[index % CLUSTER_COLORS.length];
};

function ClusterBarChart({ data, loading, error }) {
  const chartData = data?.map(item => ({
    cluster: `Cluster ${item.cluster}`,
    avgExamScore: item.avgExamScore,
    count: item.count,
    clusterIndex: item.cluster
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
          <Bar dataKey="avgExamScore" name="Average Exam Score">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getClusterColor(entry.clusterIndex)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default ClusterBarChart;

