const Login = () => {
  return(
    <div>
      <div>
        <label for="username">아이디&nbsp;&nbsp;</label>
        <input type="text" name="username"></input> <br />
        <label for="password">비밀번호&nbsp;&nbsp;</label>
        <input type="text" name="password"></input>
      </div>
      <div>
        <button>로그인</button>
      </div>
    </div>
  )
}

export default Login;