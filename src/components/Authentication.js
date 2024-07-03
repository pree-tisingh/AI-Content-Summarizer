import React, { useState } from 'react';
import '../styles/Authentication.css';

const Authentication = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Authentication;