import { Component } from "react";

import { createBrowserRouter } from "react-router";
import Login from './../Auth/Login';
import Register from './../Auth/Register';
import ForgetPassword from './../Auth/ForgetPassword';
import Home from './../pages/Home/Home';
import HomeLayout from './../Layouts/HomeLayout';
import Error from './../pages/Error/Error';

import AuthLayout from "../Layouts/AuthLayout";
import Terms from './../Components/Terms';
import Contact from './../Components/Contact';
import AddService from "../pages/DashBoard/AddService";
import BookedServices from "../pages/DashBoard/BookedServices";

import ServiceToDo from './../pages/DashBoard/ServiceToDo';
import DashBoardLayout from './../Layouts/DashBoardLayout';
import Services from './../pages/Services/Services';
import ServiceDetails from "../pages/Services/ServiceDetails";
import BookService from "../pages/Services/BookService";
import ManageServiceWrapper from "../pages/DashBoard/ManageServiceWrapper";
import BookedServiceWrapper from "../pages/DashBoard/BookedServiceWrapper";
import ServiceToDoWrapper from "../pages/DashBoard/ServiceToDoWrapper";
import ServiceDetailsWrapper from "../pages/Services/ServiceDetailsWrapper";
import BookServiceWrapper from "../pages/Services/BookServiceWrapper";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
        {
        path: "/terms",
        element: <Terms/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/services/:id",
        element: <ServiceDetailsWrapper />,
      },
      {
       path: "/book/:id",
       element: <BookServiceWrapper />,
}
      

    ]  },
    
    
    {path:"/dashboard",
        element:<DashBoardLayout></DashBoardLayout>,
        children:[
          {
        path: "/dashboard/addService",
        element: <AddService />,
      },
      {
        path: "/dashboard/bookedServices",
        element: < BookedServiceWrapper/>,
      },
      {
        path: "/dashboard/manageServices",
        element: <ManageServiceWrapper></ManageServiceWrapper>
      },
      {
        path: "/dashboard/serviceToDo",
        element: <ServiceToDoWrapper />,
      },
        ]
       },
      
    {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forgetPassword",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

export default router;
