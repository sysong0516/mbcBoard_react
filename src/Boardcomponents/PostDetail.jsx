import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import "./PostDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const PostDetail = () => {
  const {goTo} = UseNavi();
  const [post, setPost] = useState([]);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        console.log(response.data)
        setPost(response.data)
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
        <hr />
        <p>{post.content}</p>
        <div className="postdetail-buttons">
          <button onClick={() => {
            goTo('/post/modify/:id') //id 부분에 실제 id 값을 넣어야 함
            console.log(id);
          }}>수정</button>
          <button>삭제</button>
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