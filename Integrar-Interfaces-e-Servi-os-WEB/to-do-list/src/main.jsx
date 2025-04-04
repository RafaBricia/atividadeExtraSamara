import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index'
import PageTasks from './pages/GetTasks/PageTasks' // Você precisará criar este componente
import '../src/index.css'
import PrivateRoute from './pages/privateRoute/PrivateRoute.jsx'
import Login from './pages/Login/index'
import Register from './pages/Register/index'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <PrivateRoute element={<Home />}/>} />
        <Route path="/ListTasks" element={<PageTasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
)