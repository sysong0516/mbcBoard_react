import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import axiosInstance from "../axiosInstance";

const PostMain = () =>  {
  const {goTo} = UseNavi();
  const [topList, setTopList]  = useState([]);

  useEffect(() => {
    axiosInstance.get("/post", {params: {size:3, sort:"id,desc"}})
      .then(response => {
        console.log(response.data)
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
            {
              topList.map((data,i)=> {
                return(
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.user.username}</td>
                    <td>{data.createDate}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostMain;