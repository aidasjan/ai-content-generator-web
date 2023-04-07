import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home/Home'
import { Sidebar, RequireAuth } from 'components'
import Login from 'pages/Auth/Login'
import Register from 'pages/Auth/Register'
import Dashboard from 'pages/Dashboard/Dashboard'
import Categories from 'pages/Categories/Categories'
import Properties from 'pages/Properties/Properties'
import Users from 'pages/Users/Users'
import Create from 'pages/Create/Create'
import Publish from 'pages/Publish/Publish'
import Blog from 'pages/Blog/Blog'
import BlogContent from 'pages/BlogContent/BlogContent'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth roles={['admin', 'user']} element={<Dashboard />} />
            }
          />
          <Route
            path="/categories"
            element={<RequireAuth roles={['admin']} element={<Categories />} />}
          />
          <Route
            path="/properties"
            element={<RequireAuth roles={['admin']} element={<Properties />} />}
          />
          <Route
            path="/users"
            element={<RequireAuth roles={['admin']} element={<Users />} />}
          />
          <Route
            path="/create"
            element={<RequireAuth roles={['user']} element={<Create />} />}
          />
          <Route
            path="/contents/:id/publish"
            element={<RequireAuth roles={['user']} element={<Publish />} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogContent />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
