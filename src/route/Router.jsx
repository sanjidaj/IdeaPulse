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
      
      
    ],
    // errorElement: <NotFoundPage/>
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  
]);