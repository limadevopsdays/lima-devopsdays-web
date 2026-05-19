import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initMixpanel } from './lib/mixpanel'
import '../styles/index.css'

initMixpanel()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
