import React from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";



import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";





const Sidenav = () => {
  return (
    <div className="nav-bar">
      <div className="side-nav">
        <img
          className="profile-image"
          src={require("../components/assets/pexels-photo-15092999.webp")}
          width="50px"
        />
        <h2 className="title">ABC Institute</h2>
      </div>
      <div className="menu-wrapper">
        <Link className="menu-link">
          <span><FaHome /></span>
          Home
        </Link>
        <Link className="menu-link"> <span><FaBookReader /></span> All Course</Link>
        <Link className="menu-link"> <span><MdOutlinePlaylistAddCheckCircle /></span> Add Courses </Link>
        <Link className="menu-link"><span><IoMdPersonAdd /></span> Add Students</Link>
        <Link className="menu-link"> <span><PiStudent /></span>All Students</Link>
        <Link className="menu-link"><span><GiTakeMyMoney /></span>Collect Fee</Link>
        <Link className="menu-link"><span><FaHistory /></span>Payment History</Link>
      </div>
    </div>
  );
};

export default Sidenav;
