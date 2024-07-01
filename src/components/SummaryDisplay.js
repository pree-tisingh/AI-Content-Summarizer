// SummaryDisplay.js
import React from 'react';
import '../styles/SummaryDisplay.css'
const SummaryDisplay = ({ originalContent, summarizedContent }) => {
  return (
    <div>
      <div>
        <h2>Original Content</h2>
        <p>{originalContent}</p>
      </div>
      <div>
        <h2>AI-generated Summary</h2>
        <p>{summarizedContent}</p>
      </div>
    </div>
  );
};

export default SummaryDisplay;
