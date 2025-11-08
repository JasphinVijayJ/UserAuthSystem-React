import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/UserAuthSystem-React/'>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// http://localhost:5173/UserAuthSystem-React/login