import React, { useState } from 'react';
import './Login.css';
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if (username === 'abc' && password === '123') {
      onLogin();
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="login-input"
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default LoginForm;
