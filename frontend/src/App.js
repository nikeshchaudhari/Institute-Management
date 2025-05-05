import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import Signup from "./components/Signup";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Allcourse from "./components/Allcourse";

const App = () => {
  const router = createBrowserRouter([
    { path: "", Component: Login },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
    { path: "dashboard", Component: Dashboard,children:[
      {path:"home",Component:Home},
      {path:"allcourse",Component:Allcourse},
      
    

    ] },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
