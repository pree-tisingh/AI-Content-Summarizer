// HistorySection.js
import React from 'react';
import '../styles/HistorySection.css'
const HistorySection = ({ history }) => {
  return (
    <div>
      <h2>Summarization History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySection;
