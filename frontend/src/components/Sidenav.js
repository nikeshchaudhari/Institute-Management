import React from "react";
import "../components/style.css";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";

const Sidenav = () => {
  const location = useLocation();

  return (
    <div className="nav-bar">
      <div className="side-nav">
        <img
          className="profile-image"
          src={require("../assets/pexels-photo-15092999.webp")}
          width="50px"
        />
        <h2 className="title">ABC Institute</h2>
      </div>
      <div className="menu-wrapper">
        <Link className={location.pathname === '/dashboard/home' ? "menu-active-link" : "menu-link"} to={"/dashboard/home"}>
          <span>
            <FaHome />
          </span>
          Home
        </Link>
        <Link className={location.pathname === "/dashboard/allcourse"?"menu-active-link":"menu-link"} to={"/dashboard/allcourse"}>
          {" "}
          <span>
            <FaBookReader />
          </span>{" "}
          All Course
        </Link>
        <Link className={location.pathname ==="/dashboard/addcourse" ?"menu-active-link":"menu-link"} to={"/dashboard/addcourse"}>
          {" "}
          <span>
            <MdOutlinePlaylistAddCheckCircle />
          </span>{" "}
          Add Courses{" "}
        </Link>
        <Link className={location.pathname==="/dashboard/addstudent"?"menu-active-link":"menu-link"} to={"/dashboard/addstudent"}>
          <span>
            <IoMdPersonAdd />
          </span>{" "}
          Add Students
        </Link>
        <Link className={location.pathname=="/dashboard/allstudent"?"menu-active-link":"menu-link"} to={"/dashboard/allstudent"}>
          {" "}
          <span>
            <PiStudent />
          </span>
          All Students
        </Link>
        <Link className={location.pathname==="/dashboard/fee"?"menu-active-link":"menu-link"} to={"/dashboard/fee"}>
          <span>
            <GiTakeMyMoney />
          </span>
          Collect Fee
        </Link>
        <Link className="menu-link" to={"/dashboard/paymethistory"}>
          <span>
            <FaHistory />
          </span>
          Payment History
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
