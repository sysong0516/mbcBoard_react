import React from "react";
import './Login.css'

const Login = () => {
  
  return(
    <div className="login-container">
      <div className="login-box">
        <div className="avatar">
          <i className="fas fa-user"></i>
        </div>
        <h2>로그인</h2>
        <form>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Email or ID" name="username" required />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="text" placeholder="Password" name="password" required />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
           
          </div>
          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
    
  
}

export default Login;