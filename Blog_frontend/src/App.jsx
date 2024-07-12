import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import SignIn from './pages/signinpage'
import SignUp from './pages/signuppage'
import Dashboard from './pages/Dashboard'
import Projects from './pages/projects'
import Header from './components/header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/onlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/updatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'

function Main() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Main
