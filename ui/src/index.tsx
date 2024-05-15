import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root');

if (root !== null) {
  const appRoot = createRoot(root);
  appRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}