import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";

const Post = () => {
  const {goTo} = UseNavi();

  return(
    <div>
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
      <button>&laquo;</button>
      <button>&lt;</button>
      <button>1</button>
      <button>&gt;</button>
      <button>&raquo;</button>
      <form>
        <select name="search">
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="username">작성자</option>
        </select>
        <input type="search" placeholder="검색어를 입력해주세요" />
        <button type="submit">검색</button>
      </form>

    </div>
  )
}

export default Post;