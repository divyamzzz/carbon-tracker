import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert("Passwords don't match!");
          return;
        }
        const response = await axios.post('http://localhost:3001/signup', {
          username: email,
          password: password,
        });
        console.log('Signing Up:', response.data);
      } else {
        const response = await axios.post('http://localhost:3001/login', {
          username: email,
          password: password,
        });
        console.log('Logging In:', response.data);
      }
      navigate('/carbon-footprint');
    } catch (error) {
      console.error('Error during authentication:', error.response?.data || error.message);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-heading">Carbon Tracker</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="login-button">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="toggle-text">
          {isSignUp
            ? 'Already have an account?'
            : "Don't have an account?"}
          <button type="button" className="toggle-button" onClick={toggleSignUp}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
