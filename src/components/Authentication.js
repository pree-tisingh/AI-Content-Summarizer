import React, { useState } from 'react';
import '../styles/Authentication.css';

const Authentication = ({ setUser }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setUser(username);
  };

  return (
    <div className="authentication-container authentication-bg">
      <h2 style={{ fontFamily: 'Arial, sans-serif' }}>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Authentication;
