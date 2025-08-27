import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";
import "./Post.css";

const Post = () => {
  const {goTo} = UseNavi();

  return(
    <div className="post-container">
      <div className="post-card">
        <h3>공부 게시판</h3>
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
              <td>ㅋㅋㅋㅋ</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => {
          goTo('/post/write')
        }}><FontAwesomeIcon icon={faPen} />&nbsp;|&nbsp;쓰기</button>
        <br />
        <div className="post-pagination">
          <button>&laquo;</button>
          <button>&lt;</button>
          <button>1</button>
          <button>&gt;</button>
          <button>&raquo;</button>
        </div>
        <form>
          <select name="search">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="username">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" />
          <input type="submit" value="검색" />
        </form>
      </div>
    </div>
  )
}

export default Post;