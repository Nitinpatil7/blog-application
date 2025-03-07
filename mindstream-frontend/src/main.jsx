import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup"
import User from './pages/User.jsx'
import Blogeditor from './pages/Blogeditor.jsx'
import Blog from './pages/Blog'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Navigate to="/login" replace/>
  },
  {
    path:"/home/:user",
    element:<App/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
  },
  {
    path:"/home/:user/profile",
    element:<User/>
  },
  {
    path:"/home/:user/profile/writeblog",
    element:<Blogeditor/>
  },
  {
    path:"/home/:user/profile/writeblog/:id",
    element:<Blogeditor/>
  },
  {
    path:"home/:user/blog/:id",
    element:<Blog/>
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
