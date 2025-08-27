import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";
import "./Post.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Post = () => {
  const {goTo} = UseNavi();
  const [postList, setPostList] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 20;

  // 게시글 불러오기 함수
  const PageList = (pageNum = 0) => {
    axiosInstance.get('/search', {
      params: {
        type: searchType,
        keyword: keyword,
        page: pageNum,
        size: size
      }
    }).then(response => {
      setPostList(response.data.content)
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    }).catch(error => {
      console.error('게시글 목록 불러오기 실패: ', error);
    });
  };

  useEffect(() => {
    PageList(0);
  }, [])

  const onSearchSubmit = (e) => {
    e.preventDefault();
    PageList(0);
  }; 

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
        <form onSubmit={onSearchSubmit}>
          <select 
              name="search"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="username">작성자</option>
          </select>
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            value={keyword} 
            onChange={(e => setKeyword(e.target.value))}
          />
          <input type="submit" value="검색" />
        </form>
      </div>
    </div>
  )
}

export default Post;