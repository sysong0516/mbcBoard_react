import React, { useEffect, useState } from "react";
import './Login.css'
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";

const Login = ({ setAuth }) => {

  const { goIndex } = UseNavi();
  
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("savedId")?true:false);

  const toogleSaveId = (e) => {
    const id = document.querySelector('input[name="username"]').value;
    if (e.target.checked) {
      setRememberMe(true);
    }
    else {
      setRememberMe(false);      
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedId");
    if (savedUsername) {
      document.querySelector('input[name="username"]').value = savedUsername;
    }
  }, []);

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
            <input type="text" placeholder="ID" name="username" required autoComplete="off" />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" name="password"  required autoComplete="off" />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" checked={rememberMe} onChange={toogleSaveId} /> Remember me
            </label>

          </div>
          <button type="submit" className="login-btn" onClick={(e) => {
            e.preventDefault();
            const member={
              username: document.querySelector('input[name="username"]').value,
              password: document.querySelector('input[name="password"]').value
            };
            axiosInstance.post("/login", member)
              .then(response => {
                const jwt = response.headers.authorization; // response에서 jwt 토큰을 가져옴

                if (jwt != null) {
                  sessionStorage.setItem('jwt', jwt); // sessionStorage에 jwt 토큰 저장
                  sessionStorage.setItem('username', member.username); // username 저장
                  setAuth(true)
                  alert("로그인 성공");
                  if (rememberMe) {
                    localStorage.setItem("savedId", member.username);
                  }
                  else {
                    localStorage.removeItem("savedId");
                  }
                  goIndex();
                }
              }).catch(error => {
                alert('아이디와 비밀번호를 확인해주세요');
              })
          }}>로그인</button>
        </form>
      </div>
    </div>
  );


}

export default Login;