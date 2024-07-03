import React, { useState, useEffect } from "react";
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
  const [allScrapedContents, setAllScrapedContents] = useState([]);

  useEffect(() => {
    const storedContent = localStorage.getItem("scrapedContent");
    if (storedContent) {
      setScrapedContent(storedContent);
      setAllScrapedContents((prevContents) => [...prevContents, storedContent]);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever scrapedContent changes
    if (scrapedContent) {
      localStorage.setItem("scrapedContent", scrapedContent);
    }
  }, [scrapedContent]);

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
    setHistory([...history, { type: "summarize", content }]);
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
    setHistory([...history, { type: "scrape", content, url }]);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };
  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("scrapedContent"); 
  };


  const handleEditSave = () => {
    try {
      localStorage.setItem("scrapedContent", newScrapedContent);
      console.log("Scraped content updated successfully in local storage");
      setScrapedContent(newScrapedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating scraped content:", error);
    }
  };

  return (
    <div className={`App ${user ? "dashboard-bg" : "login-bg"}`}>
      {!user && <Authentication setUser={setUser} />}
      {user && (
        <>
          <Sidebar handleNavigate={handleNavigate} handleLogout={handleLogout} />
          <div className="content">
            <header className="App-header">
              <h1>AI-Powered Content Summarizer Dashboard</h1>
              <div className="welcome-message">Welcome, {user}!</div>
            
            </header>
            <main className="App-main">
              <section className="feature-section">
                {currentPage === "scraping" && (
                  <div className="App-results">
                    <h2>Scrapped Content</h2>
                    {allScrapedContents.map((scraped, index) => (
                      <div key={index} className="App-scraped">
                        <div className="scraped-header">
                          <h2>Scraped Content Preview</h2>
                          <FaEdit
                            className="edit-icon"
                            onClick={() => {
                              setIsEditing(true);
                              setNewScrapedContent(scraped);
                            }}
                          />
                        </div>
                        {isEditing ? (
                          <div>
                            <textarea
                              value={newScrapedContent}
                              onChange={(e) =>
                                setNewScrapedContent(e.target.value)
                              }
                            />
                            <button onClick={handleEditSave}>Save</button>
                          </div>
                        ) : (
                          <p>{scraped}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

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
                        Summary Length:
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
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setIsEditing(true);
                                setNewScrapedContent(scrapedContent);
                              }}
                            />
                          </div>
                          {isEditing ? (
                            <div>
                              <textarea
                                value={newScrapedContent}
                                onChange={(e) =>
                                  setNewScrapedContent(e.target.value)
                                }
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
                    <p id="info">
                      This is the AI-Powered Content Summarizer Dashboard.
                    </p>
                    <div className="about-content">
                      <div className="about-card">
                        <h3>Our Mission</h3>
                        <p>
                          To provide a tool that helps users quickly and
                          efficiently summarize content from various sources,
                          saving time and enhancing productivity.
                        </p>
                      </div>
                      <div className="about-card">
                        <h3>How It Works</h3>
                        <p>
                          Users can input text directly or provide a URL for
                          scraping. The AI will summarize the content based on
                          the specified length, providing a concise overview of
                          the main points.
                        </p>
                      </div>
                      <div className="about-card">
                        <h3>Team</h3>
                        <p>
                          Our team is dedicated to developing cutting-edge tools
                          that leverage AI technology to make information more
                          accessible and manageable.
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
