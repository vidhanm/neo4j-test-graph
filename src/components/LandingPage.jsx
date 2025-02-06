import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        color: 'white'
      }}>
        <h1 style={{ 
          color: 'white', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          ArXiv Papers Analysis
        </h1>
        
        <p style={{
          color: '#9CA3AF',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Welcome to the ArXiv Papers Analysis project. This tool provides insights into research paper submissions across different categories over time.
        </p>

        <h2 style={{
          color: 'white',
          marginBottom: '1.5rem',
          fontSize: '1.8rem'
        }}>
          Available Visualizations
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => window.location.href = '/visualization.html'}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={e => {
              e.target.style.backgroundColor = '#1976D2';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = '#2196F3';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            View Interactive Category Analysis
          </button>

          <button
            onClick={() => window.location.href = '/graph.html'}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#8B5CF6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={e => {
              e.target.style.backgroundColor = '#7C3AED';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            View Neo4j Graph
          </button>

          <button
            onClick={() => navigate('/trends')}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={e => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = '#10B981';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            View Trends
          </button>
        </div>

        <h2 style={{
          color: 'white',
          marginBottom: '1rem',
          fontSize: '1.8rem'
        }}>
          About
        </h2>
        
        <p style={{
          color: '#9CA3AF',
          marginBottom: '1rem',
          lineHeight: '1.6'
        }}>
          This project analyzes trends in academic paper submissions across various research categories on ArXiv. 
          The interactive visualizations allow you to explore patterns, relationships, and trends in different research fields over time through multiple perspectives:
        </p>
        
        <ul style={{
          color: '#9CA3AF',
          lineHeight: '1.6',
          paddingLeft: '1.5rem'
        }}>
          <li>Interactive Category Analysis - Explore submission trends across different research categories</li>
          <li>Neo4j Graph View - Visualize relationships between research papers and categories</li>
          <li>Trends Analysis - Discover patterns and emerging trends in research submissions</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage; 