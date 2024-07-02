import React from 'react';
import '../styles/ContentInputArea.css';

const ContentInputArea = ({ content, setContent, handleSummarize,loading }) => {
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
      <button id="ctn" onClick={handleSummarize}>Summarize Content</button>
      {loading ? 'Summarizing...' : ''}
    </div>
  );
};

export default ContentInputArea;