
import React from 'react';
import '../styles/HistorySection.css';

const HistorySection = ({ history }) => {
  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.type === 'summarize' && (
              <p>Summarized: {item.content}</p>
            )}
            {item.type === 'scrape' && (
              <div>
                <p>Scraped Content:</p>
                <p>{item.content}</p>
                <p>From URL: {item.url}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySection;

