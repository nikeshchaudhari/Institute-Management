import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import Signup from "./components/Signup";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const router = createBrowserRouter([
    { path: "", Component: Login },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
    { path: "dashboard", Component: Dashboard },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
