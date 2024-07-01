import React from 'react';
import '../styles/ContentInputArea.css';

const ContentInputArea = ({ content, setContent, handleSummarize }) => {
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="ContentInputArea">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Paste or type long-form content here..."
        rows={10}
        cols={50}
      />
      <button onClick={handleSummarize}>Summarize Content</button>
    </div>
  );
};

export default ContentInputArea;
