import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return(
    <div>
      <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  )
}

export default Header;