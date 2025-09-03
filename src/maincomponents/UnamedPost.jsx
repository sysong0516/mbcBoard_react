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
    axiosInstance.get(url, (url === '/unnamed' || url === '/post') && {params: {size:3}})
      .then(response => {
        setTopBoard(response.data.content)        
      }).catch(error => {
        console.log(error)
      })
  },[url])

  return(
    <div>
      <div className="unnamed">
        <div className="unnamed-header">
          <h2>{title}</h2>
          {
            url === '/unnamed' || url === '/post' ?
            <button onClick={() => {
              goTo(url)
            }}>더보기</button>
            : ""
          }
        </div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              {
                (url === '/post' || url === '/best') &&
                <th>작성자</th>
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
                    {
                      (url === '/best' || url === '/post')?
                      <td><Link to={`/post/${data.id}`}>{data.title}</Link></td>
                      :<td><Link to={`/unnamed/${data.id}`}>{data.title}</Link></td>
                    }
                    {
                      (url === '/post' || url === '/best') &&
                      <td>{data.user.username}</td>
                    }
                    <td>{localTime(data.createDate)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                {
                  url === '/post' || url === '/best' ?
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