import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react'; // ✅ Vercel Analytics import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics /> {/* ✅ Add here so it tracks all page views */}
    </BrowserRouter>
  </StrictMode>
);
