import { Link, Outlet, useNavigate } from "react-router-dom";

const Message = () => {
 const navigate = useNavigate();

  return(

    <div>

      <button onClick={()=>navigate('write')}>쪽지 쓰기</button> <br/>

      <Link to="sentMessage">보낸 메세지</Link><br/>
      <Link to="receivedMessage">받은 메세지</Link>

      <Outlet/>

    </div>

  )
}

export default Message;
