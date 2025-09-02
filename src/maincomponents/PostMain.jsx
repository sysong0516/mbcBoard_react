import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";


const PostMain = () =>  {
  const {goTo} = UseNavi();
  const [topList, setTopList]  = useState([]);
  
  useEffect(() => {
    axiosInstance.get("/post", {params: {size:3}})
      .then(response => {
        setTopList(response.data.content)
      }).catch(error => {
        console.log(error)
      })
  },[])

  return(
    <div>
      <div className="post">
        <h2>공부 게시판</h2>
        <button onClick={() => {
          goTo('/post')
        }}>더보기&gt;</button>
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
            { topList.length > 0 ? (
              topList.map((data,i)=> {
                return(
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td><Link to={`/post/${data.id}`}>{data.title}</Link></td>
                    <td>{data.user.username}</td>
                    <td>{data.createDate}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4">게시글이 없습니다.</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostMain;