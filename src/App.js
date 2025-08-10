// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CanvasPage from './pages/CanvasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to={`/canvas/${uuidv4()}`} replace />} 
          />
          <Route path="/canvas/:id" element={<CanvasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;