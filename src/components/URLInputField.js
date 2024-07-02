import React, { useState } from 'react';
import axios from 'axios';
import '../styles/URLInputField.css';

const URLInputField = ({ setScrapedContent, handleFetchHTML }) => {
  const [url, setUrl] = useState('');

  const handleFetch = async () => {
    const isFullPage = window.confirm("Do you want to scrape the entire page? Click 'OK' for entire page, 'Cancel' for specific section.");
    
    try {
      const response = await axios.get(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}&fullPage=${isFullPage}`);
      const htmlContent = response.data.content;
      setScrapedContent(htmlContent);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  };

  return (
    <div className="URLInputField">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
      />
      <button onClick={handleFetch}>Fetch HTML</button>
    </div>
  );
};

export default URLInputField;
