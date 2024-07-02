import React from 'react';
import { FaHome, FaHistory, FaInfoCircle, FaSignOutAlt, FaCog } from 'react-icons/fa'; // Import icons from react-icons library
import '../styles/Sidebar.css';

const Sidebar = ({ handleNavigate, userName, handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Dashboard Menu</h3>
      </div>
      <nav className="sidebar-navigation">
        <ul>
          <li onClick={() => handleNavigate('home')}>
            <FaHome className="nav-icon" /> Home
          </li>
          <li onClick={() => handleNavigate('scraping')}>
            <FaCog className="nav-icon" /> Scraping
          </li>
          <li onClick={() => handleNavigate('history')}>
            <FaHistory className="nav-icon" /> History
          </li>
          <li onClick={() => handleNavigate('about')}>
            <FaInfoCircle className="nav-icon" /> About
          </li>
        </ul>
      </nav>
      <div className="sidebar-user">
        <span className="user-name">{userName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
