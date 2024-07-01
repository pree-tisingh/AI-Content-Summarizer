import React, { useState } from 'react';
import '../styles/URLInputField.css';

const URLInputField = ({ setScrapedContent, handleFetchHTML }) => {
  const [url, setUrl] = useState('');

  const handleClick = () => {
    handleFetchHTML(url);
  };

  return (
    <div className="URLInputField">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to fetch HTML"
      />
      <button onClick={handleClick}>Fetch HTML</button>
    </div>
  );
};

export default URLInputField;
