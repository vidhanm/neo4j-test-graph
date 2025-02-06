import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Use LandingPage
import YearlyTrendsGraph from './components/YearlyTrendsGraph';
import ParticlesTest from './components/ParticlesTest'; // Add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Use LandingPage */}
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