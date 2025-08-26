import { useState } from "react";
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";

const Signup = () => {

  const [member,setMember] = useState({
  username:"",
  password:"",
  email:""

});
  const {goIndex} = UseNavi();

const onChangeHandler = (e) => {
  setMember({
    ...member,
    [e.target.name]: e.target.value
  });
}

  return(
    <div>
      <div >
        </div>
        <label for="username">아이디&nbsp;&nbsp;</label>
        <input type="text" name="username" onChange={onChangeHandler} /> <br />
        <label for="email">이메일&nbsp;&nbsp;</label>
        <input type="text" name="email" onChange={onChangeHandler}  /> <br />
        <label for="password">비밀번호&nbsp;&nbsp;</label>
        <input type="text" name="password" onChange={onChangeHandler} /> <br />
      <div>
        <button onClick={()=>{
        axiosInstance.post("/signup", member) // 추후 post로 변경,/signup
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
  )
}

export default Signup;