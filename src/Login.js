import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log('Signing Up:', email, password);
    } else {
      console.log('Logging In:', email, password);
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
        <Link to="/" className="home-link">
          <button className="home-button">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
