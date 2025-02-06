import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import YearlyTrendsGraph from './components/YearlyTrendsGraph';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trends" element={
          <div style={{ 
            backgroundColor: '#121212', 
            minHeight: '100vh',
            padding: '20px'
          }}>
            <YearlyTrendsGraph />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 