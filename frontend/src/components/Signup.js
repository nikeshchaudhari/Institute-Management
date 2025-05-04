import React, { useState } from "react";
import "../components/style.css";

const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl,setImageUrl]=useState(' ');

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(fullName, email, phone, password,image);
  };

  const fileHandler =(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  
  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={require(`../components/assets/book-logo.png`)} />
          <h3 className="signup-left-heading">Institute Management System</h3>
          <p>Manage All Data Easy Way...</p>
        </div>
        <div className="signup-right">
          <h2 className="right-header">Create Your Account ?</h2>
          <form onSubmit={submitHandler} className="signup-form">
            <input
              onChange={(e) => {
                setfullName(e.target.value);
              }}
              type="text"
              placeholder="Institute Name "
            ></input>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Emali "
            ></input>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Password "
            ></input>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="number"
              placeholder="phone "
            ></input>
            <input onChange={fileHandler}type="file" placeholder="file "></input>
            <img alt="imageUrl" src={imageUrl} width="100px"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
