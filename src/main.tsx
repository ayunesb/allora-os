import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Changed from BrowserRouter
import RootLayout from '@/layouts/RootLayout';
import App from './App';
import './styles/theme.css'; // Import theme styles
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RootLayout>
        <App />
      </RootLayout>
    </HashRouter>
  </React.StrictMode>
);
