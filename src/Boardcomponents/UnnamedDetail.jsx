import { useParams } from "react-router-dom";
import "./UnnamedDetail.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const UnnamedDetail = () => {
  const [board, setBoard] = useState([]);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/unnamed/${id}`)
      .then(response => {
        setBoard(response.data)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
  },[])

  if(loading)
    return <h1>로딩중 입니다....</h1>
  if(!board)
    return <h1>존재하지 않는 게시물입니다.</h1>  

  return(
    <div className="unnameddetail-container">
      <div className="unnameddetail-card">
        <h3>{board.title}</h3>
        <span><FontAwesomeIcon icon={faEye} />&nbsp;{board.cnt}&nbsp;|
          <span>&nbsp;<FontAwesomeIcon icon={faThumbsUp} />&nbsp;{board.likes}</span>
        </span>
        <hr />
        <p>{board.content}</p>
        <button onClick={() => {
            axiosInstance.get(`/boardlike?id=${board.id}`)
              .then(response => {
                setBoard(response.data)
              }).catch(error => {
                console.log(error)
              })
          }}>
          &nbsp;<FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <hr />
        <h5>댓글 목록</h5>
        <p>작성자</p>
        <p>댓글 내용</p>
        <textarea />
        <button>댓글 등록</button>
      </div>
    </div>
  )
}

export default UnnamedDetail;