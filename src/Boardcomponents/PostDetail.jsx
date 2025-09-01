import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import "./PostDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const PostDetail = () => {
  const { goTo } = UseNavi();
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost(); // 처음 마운트될 때 데이터 불러오기
  }, []);

  const fetchPost = async () => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('게시글 불러오기 실패: ', error);
      }).finally(() => {
        setLoading(false)
      });
  };

  if (loading)
    return <h1>로딩중 입니다....</h1>
  if (!post)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
    <div className="postdetail-container">
      <div className="postdetail-card">
        <h3>{post.title}</h3>
        <hr />
        <p>{post.content}</p>
        <div className="postdetail-buttons">
          <button onClick={() => {
            goTo('/post/modify/:id') //id 부분에 실제 id 값을 넣어야 함
          }}>수정</button>
          <button>삭제</button>
        </div>
        <hr />
        <h5>댓글 목록</h5>
        {post.replyList && post.replyList.length > 0 ? (
          post.replyList.map((reply, i) => (
            <div key={i} className="postdetail-reply">
              <p>{reply.user.username}</p>
              <p>-</p>
              <p>{reply.content}</p>
              <button>수정</button>
              <button>삭제</button>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <textarea />
        <button onClick={() => {
          const reply = {
            content: document.querySelector('textarea').value
          }
          axiosInstance.post(`/reply/${id}`, reply)
            .then(response => {
              alert(response.data);
              fetchPost();
            }).catch(error => {
              console.log(error)
            })
        }}>댓글 등록</button>
      </div>
    </div>
  )
}

export default PostDetail;