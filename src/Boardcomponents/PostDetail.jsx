import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import "./PostDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PostDetail = () => {
  const {goTo} = UseNavi();
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [isOwer,setIsOwer] = useState(false);
  
  useEffect(() => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data.post)
        setIsOwer(response.data.isOwer)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
  },[])

  if(loading)
    return <h1>로딩중 입니다....</h1>
  if(!post)
    return <h1>존재하지 않는 게시물입니다.</h1>  

  return(
    <div className="postdetail-container">
      <div className="postdetail-card">
        <h3>{post.title}</h3>
        <span>{post.user.username}&nbsp;|&nbsp;
          <span>&nbsp;<FontAwesomeIcon icon={faEye} />&nbsp;{post.cnt}&nbsp;</span> |
          <span>&nbsp;<FontAwesomeIcon icon={faThumbsUp} />&nbsp;{post.likes}</span>
        </span>
        <hr />
        <p>{post.content}</p>
        <div className="postdetail-buttons">
          {
          isOwer 
          ? 
          <>
            <button onClick={() => {
                goTo(`/post/modify/${id}`)
              }}>수정</button>
              <button onClick={() => {
                if(confirm('정말로 삭제하시겠습니까?')) {
                  axiosInstance.delete(`/post?id=${post.id}`)
                    .then(response => {
                      alert(response.data)
                      goTo('/post')
                    }).catch(error =>{
                      alert('삭제 실패')
                      console.log(error)
                    });
                }
              }}>삭제</button>
           </> 
          : " "
          }
          <button onClick={() => {
            axiosInstance.get(`/postlike?id=${post.id}`)
              .then(response => {
                setPost(response.data)
              }).catch(error => {
                console.log(error)
              })
          }}>
            &nbsp;<FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
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

export default PostDetail;