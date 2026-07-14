import { createBrowserRouter } from 'react-router';
import Register from '../pages/Register';
import Login from '../pages/Login';
import AuthLayout from '../layout/AuthLayout';
import LandingPage from '../pages/LandingPage';
import LandingLayout from '../layout/LandingLayout';
import RootLayout from '../layout/RootLayout';
import Homepage from '../pages/Homepage';
import HowItWorks from '../pages/HowItWorks';
import NotFoundPage from '../pages/NotFoundPage';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Features from '../pages/Features';







export const router = createBrowserRouter([
  {
    element: <LandingLayout/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks/>,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/features",
        element: <Features/>
      },
    
      
    ],
  },
  {
    element: <AuthLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
  {
    element: <RootLayout/>,
    children: [
      {
        path: "/homepage",
        element: <Homepage/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },

      
      
    ],
    
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  
]);