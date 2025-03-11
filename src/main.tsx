import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router'
import Home from './pages/home.tsx'
import PrimaryLayout from './layouts/primary.tsx'
import { ThemeProvider } from './utils/Theme.tsx'



createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
