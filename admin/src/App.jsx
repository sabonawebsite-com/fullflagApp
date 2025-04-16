import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPopup.css';
import adminUsers from './config/adminUsers';

const App = () => {
  const url = "http://localhost:4000";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  


  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginForm;

    const isValidUser = adminUsers.some(
      user => user.username === username && user.password === password
    );

    if (isValidUser) {
      setIsLoggedIn(true);
      setShowLoginPopup(false);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid username or password');

      setLoginForm(prev => ({ ...prev, password: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        {showLoginPopup && (
          <div className="login-popup-overlay">
            <div className="login-popup">
              <h2>Admin Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={loginForm.username}
                    onChange={handleInputChange}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Navbar onLogout={() => {
        setIsLoggedIn(false);
        setShowLoginPopup(true);
        setLoginForm({ username: '', password: '' });
        toast.info('Logged out successfully');
      }} />
      <hr />
      <div className="app-component">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Order url={url} />} />
          <Route path='*' element={<Navigate to="/add" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;