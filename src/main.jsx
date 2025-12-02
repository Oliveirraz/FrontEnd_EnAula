import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";


// Importando tema Bootswatch (Darkly)
import 'bootswatch/dist/darkly/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
