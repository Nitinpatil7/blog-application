import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Budgets from './pages/Budgets.jsx';
import Expenses from './pages/Expenses.jsx';
import EditBudget from './pages/EditBudget.jsx';
import Dashboard from './pages/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
  {
    path:"/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path: "budgets",
        element: <Budgets />, 
      },
      {
        path: "budgets/:category",
        element: <EditBudget />, 
      },
      {
        path: "expenses",
        element: <Expenses />, 
      },
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
