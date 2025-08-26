const Signup = () => {
  return(
    <div>
      <div >
        </div>
        <label for="username">아이디&nbsp;&nbsp;</label>
        <input type="text" name="username" /> <br />
        <label for="email">이메일&nbsp;&nbsp;</label> 
        <input type="text" name="email" /> <br />
        <label for="password">비밀번호&nbsp;&nbsp;</label>
        <input type="text" name="password" />
      <div>
        <button>회원가입</button>
      </div>
    </div>
  )
}

export default Signup;