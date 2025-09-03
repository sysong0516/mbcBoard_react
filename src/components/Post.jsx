import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";
import "./Post.css";
import { useEffect, useState } from "react";
import Pagination from "../btncomponents/Pagination";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import localTime from "../localTime";

const Post = () => {
  const {goTo} = UseNavi();
  const [postList, setPostList] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 20;

  // 게시글 불러오기 함수
  const pageList = (pageNum = 0) => {
    const q = keyword.trim();
    const url = q ? "/search" :"/post";
    axiosInstance.get(url, {
      params: {
        type: searchType,
        keyword: q,
        page: pageNum,
        size: size
      }
    }).then(response => {
      setPostList(response.data.content || [])
      setPage(response.data.number ?? 0);
      setTotalPages(response.data.totalPages ?? 0);
    }).catch(error => {
      console.error('게시글 목록 불러오기 실패: ', error);
    });
  };

  useEffect(() => {
    pageList(0);
  }, [])

  const onSearchSubmit = (e) => {
    e.preventDefault();
    pageList(0);
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
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {postList.length > 0 ? (
              postList.map((post,i) => {
                return(
                  <tr key={i}>
                    <td>{post.id}</td>
                    <td><Link to = {`/post/${post.id}`}>{post.title}{`${' '}[${post.replyList.length}]`}</Link></td>
                    <td>{post.user.username}</td>
                    <td>{localTime(post.createDate)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => {
          goTo('/post/write')
        }}><FontAwesomeIcon icon={faPen} />&nbsp;|&nbsp;쓰기</button>
        <br />
        <Pagination page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => pageList(newPage)}
        groupSize={10}/>
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
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
  )
}

export default Post;