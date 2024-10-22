import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/signup';
    try {
      const response = await axios.post(
        `https://gwxx6r2kz1.execute-api.ap-south-1.amazonaws.com/Prod1${endpoint}`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      if (isLogin) {
        setMessage('Login successful!');
        navigate('/booking'); // Redirect to booking page on success
      } else {
        setMessage('Signup successful!');
        navigate('/booking'); // Redirect to booking page on success
      }
    } catch (error) {
      console.error(error);
      setMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <div className="toggle-section">
          <span>{isLogin ? 'No account?' : 'Already have an account?'} </span>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginSignupPage;
