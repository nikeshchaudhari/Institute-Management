import React from "react";
import "../components/style.css";
import Sidenav from "./Sidenav";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Dashboard = () => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    const confirm = window.confirm("Are you sure you want to logout ?");
    if (confirm) {
      localStorage.clear();
      toast.success("Loggout");
      navigate("/login");
    } else {
      toast.info("Logout Cancelled...");
    }
  };
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <Sidenav />

        <div className="main-container">
          <div className="top-wrapper">
            <div className="logo-container">
              <img
                className="main-profile"
                src={localStorage.getItem("imageUrl")}
              />
            </div>
            <div className="profile-wrapper">
              <h3 className="profile-name">
                {localStorage.getItem("fullName")}
              </h3>
              <button className="btn-logout" onClick={logOutHandler}>
                Logout
              </button>
            </div>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
