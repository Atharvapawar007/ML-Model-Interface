/**
 * LevelPieChart Component
 * Displays Level distribution as a pie/doughnut chart
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ChartContainer from './ChartContainer';

// Color mapping for different levels - distinct colors for each
const getLevelColor = (level) => {
  const levelLower = level?.toLowerCase() || '';
  if (levelLower === 'expert') {
    return '#ef4444'; // Red
  } else if (levelLower === 'advanced') {
    return '#10b981'; // Green
  } else if (levelLower === 'beginner') {
    return '#eab308'; // Yellow
  } else if (levelLower === 'intermediate') {
    return '#3b82f6'; // Blue
  }
  return '#6b7280'; // Gray (default)
};

function LevelPieChart({ data, loading, error }) {
  const chartData = data?.map(item => ({
    name: item.level,
    value: item.count
  })) || [];

  return (
    <ChartContainer title="Level Distribution" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getLevelColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default LevelPieChart;

