import { useEffect, useState } from "react";
import UseNavi from "../utils/UseNavi";
import "./PostDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import localTime from "../utils/localTime";

const PostDetail = () => {
  const [replyContent, setReplyContent] = useState(""); // 댓글 입력값 상태
  const { goTo } = UseNavi();
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [liked, setLiked] = useState(true);
  const [likeCount ,setLikeCount] = useState([]);

  const [editingReplyId, setEditingReplyId] = useState(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(""); // 수정 내용

  useEffect(() => {
    axiosInstance.get('/userInfo')
      .then(response => {
        setUserInfo(response.data);
      }).catch(error => {
        console.log(error)
      });
    fetchPost(); // 처음 마운트될 때 데이터 불러오기
    getLikes();
  }, []);

  const fetchPost = async () => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data.post)
        setIsOwner(response.data.isOwner)
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

  const onClickLike = async () => {
    const { data } = await axiosInstance.post(`/post/${id}/like`);
    setLiked(data.liked);
    setLikeCount(data.likeCount);
    if(data.liked) {
      alert("👍 했습니다")
    } else {
      alert("👍 취소했습니다")
    }
  };

  const getLikes = async() => {
    axiosInstance.get(`/postlike?postId=${id}`)
      .then(response => {
        setLikeCount(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
  }

  if (loading)
    return <h1>로딩중 입니다....</h1>
  if (!post)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
    <div className="postdetail-container">
      <div className="postdetail-card">
        <h3>{post.title}</h3>
        <div className="postdetail-meta">
          <span>{post.user.username}</span>
          <span>{localTime(post.createDate)}</span>
          <span><FontAwesomeIcon icon={faEye} /> {post.cnt}</span>
          <span><FontAwesomeIcon icon={faThumbsUp} /> {likeCount}</span>
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="postdetail-buttons">
          {isOwner && (
            <>
              <button onClick={() => goTo(`/post/modify/${id}`)}>수정</button>
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
          )}
          <button onClick={onClickLike}>좋아요&nbsp;
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
        <hr />
        <h5>댓글 목록</h5>
        <div className="postdetail-reply-area">
          <table>
            <thead>
              <tr>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {post.replyList && post.replyList.length > 0 ? (
                post.replyList.map((reply, i) => (
                  <tr key={i} className="postdetail-reply">
                    {/* 작성자: 왼쪽 정렬 */}
                    <td style={{ textAlign: 'left', fontWeight: 'bold', color: '#b03060' }}>{reply.user.username}</td>
                    {/* 내용: 중앙 정렬 */}
                    {editingReplyId === reply.id ? (
                      <td colSpan={4} className="reply-edit-area" style={{ textAlign: 'center' }}>
                        <textarea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)} />
                        <button className="reply-save-btn" onClick={() => {
                          reply.content = editContent;
                          reply.id = editingReplyId;
                          axiosInstance.put(`/reply/${id}`, reply)
                            .then(response => {
                              alert(response.data);
                              fetchPost();
                            }).catch(error => {
                              alert(error.response.data);
                              console.log(error)
                            })
                          setEditingReplyId(null);
                          setEditContent("");
                        }}>저장</button>
                        <button className="reply-cancel-btn" onClick={handleCancel}>취소</button>
                      </td>
                    ) : (
                      <>
                        <td>{reply.content}</td>
                        <td>{formatTime(reply.createDate)}</td>
                        <td className="reply-action">
                            {userInfo && (userInfo === reply.user.id) && (
                              <button className="reply-edit-btn" onClick={() => handleEditClick(reply)}>수정</button>
                            )}
                            </td>
                          
                            <td>
                            {userInfo && (userInfo === reply.user.id) && (
                              <button className="reply-delete-btn" onClick={() => {
                                axiosInstance.delete(`/reply/${reply.id}`)
                                  .then(response => {
                                    alert(response.data);
                                    fetchPost();
                                  }).catch(error => {
                                    alert(error.response.data);
                                    console.log(error)
                                  })
                              }}>삭제</button>
                            )}
                          </td>
                            </>
                            
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5}>댓글이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
          <textarea className="reply-input" value={replyContent} onChange={e => setReplyContent(e.target.value)}/>
          <button className="reply-submit-btn" onClick={() => {
            if (!replyContent.trim()) {
              alert("댓글 내용을 입력해주세요.");
              return;
            }
            const reply = {
              content: replyContent
            }
            axiosInstance.post(`/reply/${id}`, reply)
              .then(response => {
                alert(response.data);
                setReplyContent(""); // 입력값 초기화
                fetchPost();
              }).catch(error => {
                console.log(error)
              })
          }}>댓글 등록</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;