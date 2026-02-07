import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PosterPage from './components/PosterPage';
import PosterCalculator from './components/PosterCalculator';
import './index.css';

// Simple path-based router — no react-router dependency needed
// _redirects already sends /* → /index.html for Cloudflare SPA support
function Router() {
  const path = window.location.pathname;

  if (path === '/posters/calculator' || path === '/posters/calculator/') {
    return <PosterCalculator />;
  }

  if (path === '/posters' || path === '/posters/') {
    return <PosterPage />;
  }

  // Default: landing page (manual printing)
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
