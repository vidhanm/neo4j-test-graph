import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [figurePosition, setFigurePosition] = useState({ x: 50, y: 50 });
  const gridRef = useRef(null);

  // Function to update grid cells based on figure position
  useEffect(() => {
    const updateGridCells = () => {
      const gridCells = gridRef.current?.children;
      const figure = document.querySelector('.moving-figure');
      if (!gridCells || !figure) return;

      const figureRect = figure.getBoundingClientRect();
      const figureCenter = {
        x: figureRect.left + figureRect.width / 2,
        y: figureRect.top + figureRect.height / 2
      };

      for (let i = 0; i < gridCells.length; i++) {
        const cell = gridCells[i];
        const rect = cell.getBoundingClientRect();
        const cellCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const distance = Math.sqrt(
          Math.pow(cellCenter.x - figureCenter.x, 2) +
          Math.pow(cellCenter.y - figureCenter.y, 2)
        );

        if (distance < 400) {
          const intensity = Math.pow(1 - (distance / 400), 1.5);
          const r = Math.round(255 * intensity);
          const g = Math.round(69 * intensity);
          const b = 0;
          cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else {
          cell.style.backgroundColor = '#000000';
        }
      }
    };

    // Update figure position based on animation
    const updatePosition = () => {
      const time = (Date.now() % 15000) / 15000; // 15s animation cycle
      const keyframes = [
        { x: 50, y: 50 },    // 0%
        { x: 30, y: 20 },    // 10%
        { x: 70, y: 40 },    // 20%
        { x: 90, y: 50 },    // 30%
        { x: 70, y: 70 },    // 40%
        { x: 40, y: 90 },    // 50%
        { x: 10, y: 70 },    // 60%
        { x: 20, y: 20 },    // 70%
        { x: 50, y: 10 },    // 80%
        { x: 30, y: 30 },    // 90%
        { x: 50, y: 50 }     // 100%
      ];

      const index = Math.floor(time * 10);
      const nextIndex = (index + 1) % keyframes.length;
      const progress = (time * 10) % 1;

      const x = keyframes[index].x + (keyframes[nextIndex].x - keyframes[index].x) * progress;
      const y = keyframes[index].y + (keyframes[nextIndex].y - keyframes[index].y) * progress;

      setFigurePosition({ x, y });
      updateGridCells();
    };

    const animationFrame = requestAnimationFrame(function animate() {
      updatePosition();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      height: '100vh',
      background: '#000000',
      overflow: 'hidden'
    }}>
      <div 
        ref={gridRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(40, 1fr)',
          gap: '0px',
          zIndex: 0,
          background: '#000000',
          pointerEvents: 'none'
        }}
      >
        {[...Array(1600)].map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#000000',
              aspectRatio: '1',
              transition: 'background-color 0.15s ease',
            }}
          />
        ))}
      </div>

      {/* Animated gradient figure */}
      <div 
        className="moving-figure"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '600px',
          background: `
            radial-gradient(ellipse at center, 
              rgba(255, 69, 0, 0.4) 0%,
              rgba(255, 69, 0, 0.2) 40%,
              transparent 70%
            )
          `,
          animation: 'moveFigure 20s linear infinite',
          zIndex: 1,
          borderRadius: '300px'
        }}
      />

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '24px'
      }}>
       
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        color: 'white',
        fontFamily: 'monospace'
      }}>
       
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '20px',
        color: 'white'
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
    </div>
  );
};

export default LandingPage; 