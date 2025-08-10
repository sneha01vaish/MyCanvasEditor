// src/components/UI/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading canvas...</p>
    </div>
  );
};

export default LoadingSpinner;