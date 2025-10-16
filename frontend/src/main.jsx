import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme before React renders to avoid flash
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const defaultTheme = savedTheme || 'dark';
  
  if (defaultTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Save default theme if not exists
  if (!savedTheme) {
    localStorage.setItem('theme', defaultTheme);
  }
};

initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
