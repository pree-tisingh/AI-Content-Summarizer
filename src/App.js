import React, { useState } from "react";
import "./App.css";
import ContentInputArea from "./components/ContentInputArea";
import URLInputField from "./components/URLInputField";
import SummaryDisplay from "./components/SummaryDisplay";
import HistorySection from "./components/HistorySection";
import Authentication from "./components/Authentication";

const App = () => {
  const [content, setContent] = useState("");
  const [scrapedContent, setScrapedContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [summarizedContent, setSummarizedContent] = useState("");
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");

  // Function to handle fetching HTML from URL
  const handleFetchHTML = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch HTML");
      }
      const htmlContent = await response.text();
      setScrapedContent(htmlContent);
    } catch (error) {
      console.error("Error fetching HTML:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Function to summarize content
  const handleSummarize = () => {
    const summary = summarizeText(content, summaryLength); // Implement this function as needed
    setOriginalContent(content);
    setSummarizedContent(summary);
    setHistory([...history, content]);
  };

  // Function to mock summarization (replace with actual AI summarization)
  const summarizeText = (text, summaryLength) => {
    const length =
      summaryLength === "short" ? 100 : summaryLength === "medium" ? 200 : 300;
    const summary = text.substring(0, length);
    return summary;
  };

  return (
    <div className={`App ${user ? "dashboard-bg" : "login-bg"}`}>
      {!user && <Authentication setUser={setUser} />}
      {user && (
        <div className="container1">
          <header className="App-header">
            <h1>AI-Powered Content Summarizer Dashboard</h1>
            <div className="welcome">Welcome, {user}!</div>
          </header>
          <main className="App-main">
            <div className="App-inputs">
              <ContentInputArea
                content={content}
                setContent={setContent}
                handleSummarize={handleSummarize}
              />
              <URLInputField
                setScrapedContent={setScrapedContent}
                handleFetchHTML={handleFetchHTML}
              />
              <div className="SummaryOptions">
                <label htmlFor="summary-length" id="length">Summary Length: </label>
                <select
                  id="summary-length"
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
                <button id="ctn" onClick={handleSummarize}>Summarize Content</button>
              </div>
            </div>
            <div className="App-results">
              {scrapedContent && (
                <div className="App-scraped">
                  <h2>Scraped Content Preview</h2>
                  <p>{scrapedContent}</p>
                </div>
              )}
              {originalContent && (
                <SummaryDisplay
                  originalContent={originalContent}
                  summarizedContent={summarizedContent}
                />
              )}
            </div>
            <HistorySection history={history} />
          </main>
          <footer className="App-footer">
            <p>© 2024 AI Summarizer App. All rights reserved.</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
