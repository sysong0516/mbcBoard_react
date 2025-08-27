import { useState } from "react";
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";
import "./Signup.css";

const Signup = () => {

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
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-avatar">
          
        </div>
        <h2>회원가입</h2>
        <label htmlFor="username">아이디&nbsp;&nbsp;</label>
        <input type="text" placeholder="ID" name="username" onChange={onChangeHandler} /> <br />
        <label htmlFor="email">이메일&nbsp;&nbsp;</label>
        <input type="text" placeholder="Email" name="email" onChange={onChangeHandler} /> <br />
        <label htmlFor="password">비밀번호&nbsp;&nbsp;</label>
        <input type="text" placeholder="Password" name="password" onChange={onChangeHandler} /> <br />
        <button onClick={() => {
          axiosInstance.post("/signup", member)
            .then(response => {
              console.log(response.data);
              goIndex();
              alert(response.data);
            }).catch(error => {
              console.log(error);
            });
        }}>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;