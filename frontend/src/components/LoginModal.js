// LoginModal.js
import React, { useState } from 'react';
import '../css/styles.css';
import UserApi from '../api/UserApi';

const LoginModal = ({ onClose, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const credentials = { username: username, password: password};
    UserApi.loginUser(credentials, setIsLoggedIn);
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h1 className='login-text' style={{ color: 'white' }}>Login</h1>
        <br></br>
        <br></br>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
