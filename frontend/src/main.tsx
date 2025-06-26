import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import RouteList from './routes'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouteList />
    <ToastContainer />
  </StrictMode>,
)
