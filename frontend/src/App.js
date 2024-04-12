import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Awareness from './pages/Awareness';
import LoginForm from './components/Login';

// Higher-order component to wrap App with Router
const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Check if the current route is the Awareness page
  const isAwarenessPage = location.pathname === '/aware';

  return (
    <div className="App">
      <Navbar />
      <div style={{ position: 'relative' }}>
        <Routes>
          <Route path="/" element={isLoggedIn || isAwarenessPage ? <Home /> : <Blur><Home /></Blur>} />
          <Route path="/analysis" element={isLoggedIn || isAwarenessPage ? <Analysis /> : <Blur><Analysis /></Blur>} />
          <Route path="/aware" element={<Awareness />} />
        </Routes>
        {!isLoggedIn && !isAwarenessPage && (
          <>
            <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: '10' }}></div>
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '20' }}>
              <LoginForm onLogin={handleLogin} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Blur = ({ children }) => <div style={{ filter: 'blur(5px)' }}>{children}</div>;

export default AppWithRouter;
