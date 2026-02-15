import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PosterPage from './components/PosterPage';
import PosterCalculator from './components/PosterCalculator';
import AviationManualPrinting from './components/AviationManualPrinting';
import ChecklistPrinting from './components/ChecklistPrinting';
import LargeFormatPrinting from './components/LargeFormatPrinting';
import BindingOptions from './components/BindingOptions';
import FlightSchoolMaterials from './components/FlightSchoolMaterials';
import DocumentPreservation from './components/DocumentPreservation';
import FilePreparationGuide from './components/FilePreparationGuide';
import CorporateFlightDepartments from './components/CorporateFlightDepartments';
import MilitaryDocumentPrinting from './components/MilitaryDocumentPrinting';
import './index.css';

// Per-route SEO metadata
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Aviation Manual Printing Services | ESSCO Aircraft - Since 1955',
    description: 'Professional aviation manual printing. Upload your PDF, get instant pricing. 70 years experience, 250,000+ orders, 100% positive feedback. Same-day production available.',
  },
  '/posters': {
    title: 'Aviation Poster Printing | Large Format | ESSCO Aircraft',
    description: 'Large format aviation poster printing from 18×24 to 36×48. Aircraft profiles, cockpit posters, airport diagrams. Upload your file, get instant pricing.',
  },
  '/posters/calculator': {
    title: 'Poster Pricing Calculator | Instant Quotes | ESSCO Aircraft',
    description: 'Get instant pricing for aviation poster printing. Select your size, quantity, and finish. No account required. Ships next business day.',
  },
  '/aviation-manual-printing': {
    title: 'Aviation Manual Printing | POH, AFM, Maintenance Manuals | ESSCO Aircraft',
    description: 'Professional aviation manual printing for POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing. 70 years trusted, same-day production.',
  },
  '/checklist-printing': {
    title: 'Aviation Checklist Printing | Custom Cockpit Checklists | ESSCO Aircraft',
    description: 'Custom aviation checklist printing. Emergency procedures, normal ops, quick-reference cards. Laminated, coil-bound, cockpit-ready. Upload your PDF for instant pricing.',
  },
  '/large-format-printing': {
    title: 'Large Format Aviation Printing | Schematics & Blueprints | ESSCO Aircraft',
    description: 'Large format printing for aviation schematics, wiring diagrams, CAD drawings, and blueprints. Up to 36" wide on HP DesignJet. Upload your file for instant pricing.',
  },
  '/binding-options': {
    title: 'Aviation Manual Binding Options | Coil, Comb, Perfect Binding | ESSCO Aircraft',
    description: 'Compare binding options for aviation manuals — coil, comb, 3-ring, perfect binding, and saddle stitch. See which binding works best for cockpit use, shelf storage, and field reference.',
  },
  '/flight-school-materials': {
    title: 'Flight School Printing Services | Training Materials & Syllabi | ESSCO Aircraft',
    description: 'Print flight training materials, ground school packets, syllabi, and student pilot kits. No minimum order. Upload your PDF for instant pricing. Part 141 and Part 61 programs.',
  },
  '/document-preservation': {
    title: 'Aviation Manual Reprints & Document Preservation | ESSCO Aircraft — Since 1955',
    description: 'Preserve deteriorating aviation manuals with professional reprints. 180,000-title archive. Digital restoration, Xerox Versant printing. Upload your PDF or browse our catalog.',
  },
  '/file-preparation-guide': {
    title: 'Aviation PDF File Preparation Guide | Print-Ready Tips | ESSCO Aircraft',
    description: 'How to prepare your aviation PDF for professional printing. Tips for scanned manuals, mixed page sizes, color detection, and resolution. Or just upload as-is — our system handles the rest.',
  },
  '/corporate-flight-departments': {
    title: 'Corporate Flight Department Printing | Part 135 Operations Manuals | ESSCO Aircraft',
    description: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation for corporate flight departments. No minimum order. Upload your PDF for instant pricing.',
  },
  '/military-document-printing': {
    title: 'Military Aviation Document Printing | Technical Manuals & TOs | ESSCO Aircraft',
    description: 'Print military technical manuals, NAVAIR publications, Army TMs, Air Force Technical Orders, and maintenance documentation. No minimum order. Upload your PDF for instant pricing.',
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

  if (path === '/aviation-manual-printing') {
    return <AviationManualPrinting />;
  }

  if (path === '/checklist-printing') {
    return <ChecklistPrinting />;
  }

  if (path === '/large-format-printing') {
    return <LargeFormatPrinting />;
  }

  if (path === '/binding-options') {
    return <BindingOptions />;
  }

  if (path === '/flight-school-materials') {
    return <FlightSchoolMaterials />;
  }

  if (path === '/document-preservation') {
    return <DocumentPreservation />;
  }

  if (path === '/file-preparation-guide') {
    return <FilePreparationGuide />;
  }

  if (path === '/corporate-flight-departments') {
    return <CorporateFlightDepartments />;
  }

  if (path === '/military-document-printing') {
    return <MilitaryDocumentPrinting />;
  }

  // Default: landing page (manual printing)
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
