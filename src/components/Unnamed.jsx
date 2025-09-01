import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseNavi from "../UseNavi";
import "./Unnamed.css";
import { useEffect, useState } from "react";
import Pagination from "../btncomponents/Pagination";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";

const Unnamed = () => {
  const {goTo} = UseNavi();
  const [unnamedList, setUnnamedList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageList = (pageNum = 0) => {
    axiosInstance.get(`/unnamed?page=${pageNum}`)
      .then(response => {
        setUnnamedList(response.data.content || [])
        setPage(response.data.number ?? 0);
        setTotalPages(response.data.totalPages ?? 0);
      }).catch(error => {
        console.error('게시글 목록 불러오기 실패  : ', error)
      })

  }

  useEffect(() => {
    pageList(0);
  }, [])

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
            {unnamedList.length > 0 ? (
              unnamedList.map((board,i) => {
                return(
                  <tr key={i}>
                    <td>{board.id}</td>
                    <td><Link to = {`/unnamed/${board.id}`}>{board.title}</Link></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="2">게시글이 없습니다.</td>
              </tr>
            )
            }
          </tbody>
        </table>
        <button onClick={() => {
          goTo('/unnamed/write')
        }}><FontAwesomeIcon icon={faPen} />&nbsp;|&nbsp;쓰기</button>
        <br />
        <Pagination page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => pageList(newPage)}
        groupSize={10}/>
      </div>
    </div>
  )
}

export default Unnamed;