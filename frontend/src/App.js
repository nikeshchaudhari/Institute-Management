import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import Signup from "./components/Signup";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AllCourse from './components/AllCourse'
import AllStudent from './components/AllStudent'
import Home from "./components/Home";
import AddCourse from "./components/AddCourse";
import AddStudent from "./components/AddStudent";

import Fee from "./components/Fee";
import PayHistory from "./components/PayHistory";

const App = () => {
  const router = createBrowserRouter([
    { path: "", Component: Login },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
    { path: "dashboard", Component: Dashboard,children:[
      {path:"",Component:Home},
      {path:"home",Component:Home},
      {path:"addcourse",Component:AddCourse},
      {path:"allcourse",Component:AllCourse},
      {path:"addstudent",Component:AddStudent},
      {path:"allstudent",Component:AllStudent},
      {path:"fee",Component:Fee},
      {path:"paymethistory",Component:PayHistory}
     
      
    

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
