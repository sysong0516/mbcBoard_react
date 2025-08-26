import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = () => {
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
      <button><FontAwesomeIcon icon={faPen} />&nbsp;|&nbsp;쓰기</button>
      <br />
      <button>&laquo;</button>
      <button>&lt;</button>
      <button>1</button>
      <button>&gt;</button>
      <button>&raquo;</button>
    </div>
  )
}

export default Post;