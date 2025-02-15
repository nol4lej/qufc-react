import React from 'react'
import ReactDOM from 'react-dom/client'

import '@styles/index.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import { router } from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
