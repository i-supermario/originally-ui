import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import PrimaryLayout from './layouts/primary.tsx'
import { ThemeProvider } from './utils/Theme.tsx'
import SignUp from './pages/SignUp.tsx'
import { CenteredLayout } from './layouts/centered.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Login from './pages/Login.tsx'
import { SessionProvider } from './providers/SessionProvider.tsx'



createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrimaryLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element= {<CenteredLayout/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/sign-up' element={<SignUp/>}  />
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </SessionProvider>
)
