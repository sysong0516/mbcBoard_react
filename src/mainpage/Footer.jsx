import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <Link to="/terms">이용약관</Link>
        <Link to="/privacy">개인정보처리방침</Link>
        <p>© 2025 StudyBoard. 익명게시판의 글은 익명으로 작성되며, 공부게시판의 글은 작성자 아이디가 표시됩니다. 모든 게시물의 책임은 작성자에게 있으며, 사이트는 내용에 대한 법적 책임을 지지 않습니다.</p>
      </div>
    </footer>
  );
};

export default Footer;