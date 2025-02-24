import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from './Components/Login.jsx'
import SignUpPage from './Components/SignupPage.jsx';
import Navbar from './Components/navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'



function App() {

  return (
    <>
      <Router>
        <Navbar/>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
