import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './utils/_sig.js'
import App from './App.jsx'

const _cw = console.warn.bind(console)
console.warn = (...a) => { if (typeof a[0] === 'string' && a[0].includes('THREE.Clock')) return; _cw(...a) }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
