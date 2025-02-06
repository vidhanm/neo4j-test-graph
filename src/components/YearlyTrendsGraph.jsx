import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const YearlyTrendsGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/yearly_category_counts.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('CSV parsing errors:', results.errors);
            }
            
            if (results.data.length === 0) {
              setError('No data found in CSV file');
              return;
            }

            const years = results.data.map(row => row.Year).filter(Boolean);
            const categories = Object.keys(results.data[0])
              .filter(key => key !== 'Year' && key.trim() !== '');
            
            if (years.length === 0 || categories.length === 0) {
              setError('Invalid data format in CSV file');
              return;
            }

            const datasets = categories.map((category, index) => ({
              label: category,
              data: results.data.map(row => row[category]),
              borderColor: getColorForIndex(index),
              backgroundColor: getColorForIndex(index),
              tension: 0.4,
              pointRadius: 4,
              borderWidth: 2,
            }));

            setChartData({
              labels: years,
              datasets: datasets
            });
          },
          error: (error) => {
            setError(`Error parsing CSV: ${error.message}`);
          }
        });
      } catch (error) {
        setError(`Error loading data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Research Papers by Category Over Time',
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16
        },
        padding: 20
      }
    }
  };

  // Function to generate colors for different categories
  const getColorForIndex = (index) => {
    const colors = [
      'rgb(59, 130, 246)', // Blue
      'rgb(16, 185, 129)', // Green
      'rgb(239, 68, 68)',  // Red
      'rgb(217, 119, 6)',  // Orange
      'rgb(139, 92, 246)', // Purple
      'rgb(236, 72, 153)', // Pink
      'rgb(14, 165, 233)', // Light Blue
      'rgb(168, 85, 247)', // Violet
      'rgb(234, 179, 8)',  // Yellow
      'rgb(6, 182, 212)',  // Cyan
    ];
    return colors[index % colors.length];
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '600px', 
      backgroundColor: '#1a1a1a', 
      padding: '20px',
      borderRadius: '8px'
    }}>
      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
          {error}
        </div>
      )}
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
};

export default YearlyTrendsGraph; 