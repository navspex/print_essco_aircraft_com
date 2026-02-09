import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PosterPage from './components/PosterPage';
import PosterCalculator from './components/PosterCalculator';
import './index.css';

// Per-route SEO metadata
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Aviation Manual Printing Services | ESSCO Aircraft - Since 1955',
    description: 'Professional aviation manual printing. Upload your PDF, get instant pricing. 70 years experience, 34,000+ orders, 100% positive feedback. Same-day production available.',
  },
  '/posters': {
    title: 'Aviation Poster Printing | Large Format | ESSCO Aircraft',
    description: 'Large format aviation poster printing from 18×24 to 36×48. Aircraft profiles, cockpit posters, airport diagrams. Upload your file, get instant pricing.',
  },
  '/posters/calculator': {
    title: 'Poster Pricing Calculator | Instant Quotes | ESSCO Aircraft',
    description: 'Get instant pricing for aviation poster printing. Select your size, quantity, and finish. No account required. Ships next business day.',
  },
};

function useRouteMeta(path: string) {
  useEffect(() => {
    const meta = routeMeta[path] || routeMeta['/'];
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    } else {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      descTag.setAttribute('content', meta.description);
      document.head.appendChild(descTag);
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalTag) {
      canonicalTag.href = `https://print.esscoaircraft.com${path === '/' ? '' : path}`;
    }
  }, [path]);
}

// Simple path-based router — no react-router dependency needed
// _redirects already sends /* → /index.html for Cloudflare SPA support
function Router() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  useRouteMeta(path);

  if (path === '/posters/calculator') {
    return <PosterCalculator />;
  }

  if (path === '/posters') {
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
