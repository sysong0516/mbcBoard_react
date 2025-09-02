import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";

const UnamedPost = () => {
  const {goTo} = UseNavi();
  const [topBoard, setTopBoard] = useState([]);
  const [uploadTime, setUploadTime] = useState([])

  useEffect(() => {
    axiosInstance.get("/unnamed", {params: {size:3}})
      .then(response => {
        console.log(response.data.content)
        setTopBoard(response.data.content)        
      }).catch(error => {
        console.log(error)
      })
  },[])

  return(
    <div>
      <div className="unnamed">
        <h2>익명 게시판</h2>
        <button onClick={() => {
          goTo('/unnamed')
        }}>더보기&gt;</button>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            { topBoard.length > 0 ? (
              topBoard.map((data,i)=>  {
                return(
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td><Link to={`/unnamed/${data.id}`}>{data.title}</Link></td>
                    <td>{data.createDate}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">게시글이 없습니다.</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>    
    </div>
  )
}

export default UnamedPost;