import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Global enterprise tailwind injection layer styles hook

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Critial Mount Node Dom binding injection point missing from public path configuration.');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);