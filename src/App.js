import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaEdit } from "react-icons/fa";
import ContentInputArea from "./components/ContentInputArea";
import URLInputField from "./components/URLInputField";
import SummaryDisplay from "./components/SummaryDisplay";
import HistorySection from "./components/HistorySection";
import Authentication from "./components/Authentication";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [content, setContent] = useState("");
  const [scrapedContent, setScrapedContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [summarizedContent, setSummarizedContent] = useState("");
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [currentPage, setCurrentPage] = useState("home");
  const [isEditing, setIsEditing] = useState(false);
  const [newScrapedContent, setNewScrapedContent] = useState("");

  const summarizeText = (text, summaryLength) => {
    const length =
      summaryLength === "short" ? 100 : summaryLength === "medium" ? 200 : 300;
    const summary = text.substring(0, length);
    return summary;
  };

  const handleSummarize = () => {
    const summary = summarizeText(content, summaryLength);
    setOriginalContent(content);
    setSummarizedContent(summary);
    setHistory([...history, { type: 'summarize', content }]);
  };

  const handleFetchHTML = async (url) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/scrape?url=${encodeURIComponent(url)}`
      );
      const htmlContent = response.data.content;
      setScrapedContent(htmlContent);
      saveScrapedContentToHistory(htmlContent, url);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  const saveScrapedContentToHistory = (content, url) => {
    setHistory([...history, { type: 'scrape', content, url }]);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleEditSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/scraped-content', { content: newScrapedContent });
      setScrapedContent(newScrapedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating scraped content:', error);
    }
  };

  return (
    <div className={`App ${user ? "dashboard-bg" : "login-bg"}`}>
      {!user && <Authentication setUser={setUser} />}
      {user && (
        <>
          <Sidebar handleNavigate={handleNavigate} />
          <div className="content">
            <header className="App-header">
              <h1>AI-Powered Content Summarizer Dashboard</h1>
              <div className="welcome-message">Welcome, {user}!</div>
            </header>
            <main className="App-main">
              {currentPage === "scraping" && (
                <div className="App-results">
                  {scrapedContent && (
                    <div className="App-scraped">
                      <div className="scraped-header">
                        <h2>Scraped Content Preview</h2>
                        <FaEdit className="edit-icon" onClick={() => {
                          setIsEditing(true);
                          setNewScrapedContent(scrapedContent);
                        }} />
                      </div>
                      {isEditing ? (
                        <div>
                          <textarea 
                            value={newScrapedContent}
                            onChange={(e) => setNewScrapedContent(e.target.value)}
                          />
                          <button onClick={handleEditSave}>Save</button>
                        </div>
                      ) : (
                        <p>{scrapedContent}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              <section className="feature-section">
                {currentPage === "home" && (
                  <div className="App-inputs">
                    <h2>Features Section</h2>
                    <div className="InputArea">
                      <ContentInputArea
                        content={content}
                        setContent={setContent}
                        handleSummarize={handleSummarize}
                      />
                      <URLInputField
                        setScrapedContent={setScrapedContent}
                        handleFetchHTML={handleFetchHTML}
                      />
                    </div>
                    <div className="SummaryOptions">
                      <label htmlFor="summary-length" id="length">
                        Summary Length:{" "}
                      </label>
                      <select
                        id="summary-length"
                        value={summaryLength}
                        onChange={(e) => setSummaryLength(e.target.value)}
                      >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                      </select>
                      <button id="ctn1" onClick={handleSummarize}>
                        Summarize Content
                      </button>
                    </div>
                    <div className="App-results">
                      {scrapedContent && (
                        <div className="App-scraped">
                          <div className="scraped-header">
                            <h2>Scraped Content Preview</h2>
                            <FaEdit className="edit-icon" onClick={() => {
                              setIsEditing(true);
                              setNewScrapedContent(scrapedContent);
                            }} />
                          </div>
                          {isEditing ? (
                            <div>
                              <textarea 
                                value={newScrapedContent}
                                onChange={(e) => setNewScrapedContent(e.target.value)}
                              />
                              <button onClick={handleEditSave}>Save</button>
                            </div>
                          ) : (
                            <p>{scrapedContent}</p>
                          )}
                        </div>
                      )}
                      {originalContent && (
                        <SummaryDisplay
                          originalContent={originalContent}
                          summarizedContent={summarizedContent}
                        />
                      )}
                    </div>
                  </div>
                )}
                {currentPage === "history" && (
                  <div className="App-results">
                    <HistorySection history={history} />
                  </div>
                )}
                {currentPage === "about" && (
                  <div className="App-results about-section">
                    <h2>About</h2>
                    <p id="info">This is the AI-Powered Content Summarizer Dashboard.</p>
                    <div className="about-content">
                      <div className="about-card">
                        <h3>Our Mission</h3>
                        <p>
                          Our mission is to provide seamless and efficient
                          content summarization using advanced AI algorithms.
                        </p>
                      </div>
                      <div className="about-card">
                        <h3>Features</h3>
                        <ul>
                          <li>Content Summarization</li>
                          <li>URL Fetching</li>
                          <li>User Authentication</li>
                          <li>History Display</li>
                        </ul>
                      </div>
                      <div className="about-card">
                        <h3>Contact Us</h3>
                        <p>
                          If you have any questions or feedback, feel free to
                          contact us at support@example.com.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
