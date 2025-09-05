import { useEffect, useState } from "react";
import "./UnamedPost.css";
import UseNavi from "../utils/UseNavi";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import localTime from "../utils/localTime";

const UnamedPost = ({url,title}) => {
  const {goTo} = UseNavi();
  const [topBoard, setTopBoard] = useState([]);
  
  useEffect(() => {
    const config = (url === '/unnamed' || url === '/post')
      ? {params: {size:3}}
      : {};
    axiosInstance.get(url, config)
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
                      <td className="title-long"><Link to={`/post/${data.id}`}>{data.title}{`${' '}[${data.replyList.length}]`}</Link></td>
                      :<td className="title-long"><Link to={`/unnamed/${data.id}`}>{data.title}{`${' '}[${data.replyList.length}]`}</Link></td>
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