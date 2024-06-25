import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import SignIn from './pages/signinpage'
import SignUp from './pages/signuppage'
import Dashboard from './pages/Dashbord'
import Projects from './pages/projects'
import Header from './components/header'
import Footer from './components/Footer'

function Main() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Main
