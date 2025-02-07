# ArXiv Papers Analysis

A web application for visualizing and analyzing research paper trends from ArXiv using interactive visualizations and graph-based exploration.

## Features

- Yearly trends analysis of research paper categories
- Interactive 3D force-directed graph visualization
- Category and subcategory statistics 
- Time-series visualization of paper publication trends
- Responsive web interface built with React

## Project Structure

- `/src` - React application source code
  - `components/` - React components including LandingPage, YearlyTrendsGraph, and ParticlesTest
  - `App.jsx` - Main React application component
- `/public` - Static assets and data files
  - `visualization_data.json` - Processed data for visualizations
  - `graph.html` - 3D force graph visualization
  - Various CSV files with yearly statistics
- Python analysis scripts:
  - `yearly_analysis.py` - Processes ArXiv data and generates statistics
  - `graph_gen.py` - Generates graph visualization data

## Setup

1. Install dependencies:
```sh
npm install