import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './Header.css';
import OffcanvasDemo from '../components/OffcanvasDemo';

const Header = ({ auth, setAuth }) => {

  
  // 로그인한 사용자 아이디를 sessionStorage에서 가져옴
  const username = sessionStorage.getItem('username')
  return(
    <header className="header">
      <Link to="/" className="logo"><FontAwesomeIcon icon={faHouse} size="3vh"/>Pink천국</Link>
      <nav className="nav">
        <Link to="/message">쪽지</Link>
        <Link to="/post">공부 게시판</Link>
        <Link to="/unnamed">익명 게시판</Link>
        
          
        {auth ? (
          <div className="header-auth">
            <span className="header-welcome">{username ? `${username}님 환영합니다!` : '환영합니다!'}</span>
            <button className="header-logout-btn" onClick={() => { setAuth(false); sessionStorage.removeItem('username'); sessionStorage.removeItem('jwt'); window.dispatchEvent(new Event('logout')); }}>로그아웃</button>
          </div>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </nav>
    
    <OffcanvasDemo />
    </header>
  )
}




export default Header;