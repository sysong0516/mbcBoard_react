import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Message.css"

const Message = () => {
 const navigate = useNavigate();

  return(

    <div className="menu">

      <div className="menu-top">
        <Link to="sentMessage">보낸 메세지</Link><br/>
        <Link to="receivedMessage">받은 메세지</Link><br/>
        <button onClick={()=>navigate('write')}>쪽지 쓰기</button>
      </div>
      
      <Outlet/>

    </div>

  )
}

export default Message;
