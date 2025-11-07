/**
 * StudyHoursChart Component
 * Displays average ExamScore by StudyHours buckets as a line chart
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';

function StudyHoursChart({ data, loading, error }) {
  const chartData = data?.map(item => ({
    bucket: item.bucket,
    avgExamScore: item.avgExamScore,
    count: item.count
  })) || [];

  return (
    <ChartContainer title="Average Exam Score by Study Hours" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bucket" label={{ value: 'Study Hours', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Average Exam Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value, name) => [
              name === 'avgExamScore' ? `${value.toFixed(2)}` : value,
              name === 'avgExamScore' ? 'Avg Exam Score' : 'Count'
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="avgExamScore" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Average Exam Score"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default StudyHoursChart;

