import React, { useState } from 'react';
import UserApi from '../api/UserApi';
import '../css/Signup.css'; // Import your CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const handleSignup = async () => {
      UserApi.createUser({username: username, password: password})
      };

  return (
    
      <div className="signup-container">
        <h2>Signup</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    
  );
};

export default Signup;
