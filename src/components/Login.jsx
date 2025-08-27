import React, { useState } from "react";
import './Login.css'
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";

const Login = () => {
  const [member, setMember] = useState({
    username: "",
    password: "",
    email: ""
  });
  const { goIndex } = UseNavi();

  const onChangeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar">
          <i className="fas fa-user"></i>
        </div>
        <h2>로그인</h2>
        <form>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Email or ID" name="username" onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="text" placeholder="Password" name="password" onChange={onChangeHandler} required />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>

          </div>
          <button type="submit" className="login-btn" onClick={() => {
            axiosInstance.post("/login", member)
              .then(response => {
                console.log(response.data);
                goIndex();
              }).catch(error => {
                console.log(error);
              });
          }}>로그인</button>
        </form>
      </div>
    </div>
  );


}

export default Login;