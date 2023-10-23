import React, { useState } from 'react';
import UserApi from '../api/UserApi';
import '../css/Signup.css'; // Import your CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // New state for password confirmation

  const handleSignup = async () => {
    if (password === passwordConfirm) {
      // Passwords match, proceed with signup
      UserApi.createUser({ username, password });
    } else {
      // Passwords do not match, display an error or handle it as needed
      alert('Passwords do not match. Please confirm your password.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className='signup-text' style={{ color: 'white' }}>Signup</h1>
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
        {/* New password confirmation field */}
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
