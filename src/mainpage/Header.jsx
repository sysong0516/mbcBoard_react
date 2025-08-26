import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return(
    <div className="header">
      <div className="home">
        <Link to="/"><FontAwesomeIcon icon={faHouse} size="3vh"/></Link>
      </div>

      <div className="logo"> 
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  )
}

export default Header;