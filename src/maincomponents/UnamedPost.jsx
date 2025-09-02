import { useEffect, useState } from "react";
import "./UnamedPost.css";
import UseNavi from "../UseNavi";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import localTime from "../localTime";

const UnamedPost = ({url,title}) => {
  const {goTo} = UseNavi();
  const [topBoard, setTopBoard] = useState([]);
  
  useEffect(() => {
    axiosInstance.get(url, {params: {size:3}})
      .then(response => {
        setTopBoard(response.data.content)        
      }).catch(error => {
        console.log(error)
      })
  },[url])

  return(
    <div>
      <div className="unnamed">
        <h2>{title}</h2>
        {
          url === '/unnamed' || url === '/post' ?
          <button onClick={() => {
            goTo(url)
          }}>더보기&gt;</button>
          : ""
        }
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              {
                url === '/post' ?
                <th>작성자</th>
                :
                ""
              }
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            { topBoard.length > 0 ? (
              topBoard.map((data,i)=>  {
                return(
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td><Link to={`${url}/${data.id}`}>{data.title}</Link></td>
                    {
                      url === '/post' ?
                      <td>{data.user.username}</td>
                      :
                      ""
                    }
                    <td>{localTime(data.createDate)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                {
                  url === '/post' ?
                  <td colSpan="4">게시글이 없습니다.</td>
                  :
                  <td colSpan="3">게시글이 없습니다.</td>
                }
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