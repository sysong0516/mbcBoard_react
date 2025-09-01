import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import "./PostDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PostDetail = () => {
  const { goTo } = UseNavi();
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isOwer, setIsOwer] = useState(false);

  const [editingReplyId, setEditingReplyId] = useState(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(""); // 수정 내용

  useEffect(() => {
    fetchPost(); // 처음 마운트될 때 데이터 불러오기
  }, []);

  const fetchPost = async () => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data.post)
        setIsOwer(response.data.isOwer)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      });
  };

  const handleEditClick = (reply) => {
    setEditingReplyId(reply.id);
    setEditContent(reply.content);
  };

  const handleCancel = () => {
    setEditingReplyId(null);
    setEditContent("");
  };

  if (loading)
    return <h1>로딩중 입니다....</h1>
  if (!post)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
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
                  if (confirm('정말로 삭제하시겠습니까?')) {
                    axiosInstance.delete(`/post?id=${post.id}`)
                      .then(response => {
                        alert(response.data)
                        goTo('/post')
                      }).catch(error => {
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
        {post.replyList && post.replyList.length > 0 ? (
          post.replyList.map((reply, i) => (
            <div key={i} className="postdetail-reply">
              <p>{reply.user.username}</p>
              <p>-</p>
              {editingReplyId === reply.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)} />
                  <button onClick={() => {
                    reply.content = document.querySelector('textarea').value
                    reply.id = editingReplyId
                    axiosInstance.put(`/reply/${id}`, reply)
                      .then(response => {
                        alert(response.data);
                        fetchPost();
                      }).catch(error => {
                        console.log(error)
                      })
                    setEditingReplyId(null);
                    setEditContent("");
                  }}>저장</button>
                  <button onClick={handleCancel}>취소</button>
                </>
              ) : (
                <><p>{reply.content}</p>
                  <button onClick={() => handleEditClick(reply)}>수정</button>
                </>
              )}
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