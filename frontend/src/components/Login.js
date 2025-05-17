import React, { use, useState } from "react";
import "../components/style.css";
import axios from "axios";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9500/user/login", {
        email: email,
        password: password,
      })
      // console.log("Data............");
      .then((res) => {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('fullName',res.data.fullName)
        localStorage.setItem('imageUrl',res.data.imageUrl)
        localStorage.setItem('imageId',res.data.imageId)
        localStorage.setItem('email',res.data.email)
        toast.success( "login Successfully")
        navigate("/Dashboard");
        console.log(res);
      })
      .catch((err) => {
        toast.error("username and password wrong..");
        console.log(err);
      });
    // console.log(fullName, email, phone, password,image);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={require(`../assets/book-logo.png`)} />
          <h3 className="signup-left-heading">Institute Management System</h3>
          <p>Manage All Data Easy Way...</p>
        </div>
        <div className="signup-right">
          <h2 className="right-header">login with Your account ?</h2>
          <form onSubmit={submitHandler} className="signup-form">
            <input
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Emali "
            ></input>
            <input
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Password "
            ></input>
            <button type="submit">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              Submit
            </button>
            <Link to={"/signup"}>Create Your Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
