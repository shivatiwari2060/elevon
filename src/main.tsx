import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/montserrat/wght.css';
import '@/styles/tokens.css';
import '@/styles/tones.css';
import '@/styles/base.css';
import { App } from '@/app/App';

const root = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Production builds ship prerendered HTML for every route; hydrate it instead of re-rendering.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
