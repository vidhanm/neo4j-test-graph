import React from 'react';
import YearlyTrendsGraph from './components/YearlyTrendsGraph';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#121212', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <YearlyTrendsGraph />
    </div>
  );
}

export default App; 