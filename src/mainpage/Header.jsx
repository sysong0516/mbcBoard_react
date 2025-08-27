import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return(
  
  <header className="header">
    <Link to="/"><FontAwesomeIcon icon={faHouse} size="3vh"/>Pink 천국</Link>
  <nav className="nav">
    
    <Link to="/post">게시판</Link>
    <Link to="/">인기글</Link>
    <Link to="/login">로그인</Link>
    <Link to="/signup">회원가입</Link>
  </nav>
  </header>
    
    
  )
}




export default Header;