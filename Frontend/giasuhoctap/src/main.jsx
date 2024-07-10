import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider1 } from './context/AuthProvider1.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider1>
      <App />
    </AuthProvider1>
  </React.StrictMode>,
)
