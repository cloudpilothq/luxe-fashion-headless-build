import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ShopProvider } from './context/ShopContext'; // <--- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App with ShopProvider so useShop() works */}
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
);