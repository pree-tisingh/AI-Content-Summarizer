import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/SummaryDisplay.css';

const SummaryDisplay = ({ originalContent, summarizedContent }) => {
  const handleExport = (format) => {
    switch (format) {
      case 'text':
        const textBlob = new Blob([summarizedContent], { type: 'text/plain' });
        const textUrl = URL.createObjectURL(textBlob);
        const textLink = document.createElement('a');
        textLink.href = textUrl;
        textLink.setAttribute('download', 'summary.txt');
        document.body.appendChild(textLink);
        textLink.click();
        document.body.removeChild(textLink);
        break;
      case 'pdf':
        html2canvas(document.getElementById('summary-content')).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('summary.pdf');
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="SummaryDisplay">
      <h2>Summary Display</h2>
      <div>
        <h3>Original Content:</h3>
        <p>{originalContent}</p>
      </div>
      <div>
        <h3>Summarized Content:</h3>
        <div id="summary-content">
          <p>{summarizedContent}</p>
        </div>
      </div>
      <div className="ExportOptions">
        <button id="text" onClick={() => handleExport('text')}>Export as Text</button>
        <button id="pdf" onClick={() => handleExport('pdf')}>Export as PDF</button>
      </div>
    </div>
  );
};

export default SummaryDisplay;
