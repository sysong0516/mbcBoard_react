import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";
import "./Unnamed.css";

const Unnamed = () => {
  const {goTo} = UseNavi();
  return(
    <div className="unnamed-container">
      <div className="unnamed-card">
        <h3>익명 게시판</h3>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ㅎㅎㅎㅎ</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => {
          goTo('/unnamed/write')
        }}><FontAwesomeIcon icon={faPen} />&nbsp;|&nbsp;쓰기</button>
        <br />
        <div className="unnamed-pagination">
          <button>&laquo;</button>
          <button>&lt;</button>
          <button>1</button>
          <button>&gt;</button>
          <button>&raquo;</button>
        </div>
      </div>
    </div>
  )
}

export default Unnamed;