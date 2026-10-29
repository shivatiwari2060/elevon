import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/montserrat/wght.css';
import '@/styles/tokens.css';
import '@/styles/tones.css';
import '@/styles/base.css';
import { App } from '@/app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
