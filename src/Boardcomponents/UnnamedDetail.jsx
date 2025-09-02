import { useParams } from "react-router-dom";
import "./UnnamedDetail.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import localTime from "../localTime";


const UnnamedDetail = () => {
  const [replyContent, setReplyContent] = useState(""); // 댓글 입력값 상태
  const [board, setBoard] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [liked, setLiked] = useState(true);
  const [likeCount, setLikeCount] = useState([]);

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
    axiosInstance.get(`/unnamed/${id}`)
      .then(response => {
        setBoard(response.data)
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
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
  }

  const onClickLike = async () => {
    const { data } = await axiosInstance.post(`/unnamed/${id}/like`);
    setLiked(data.liked);
    setLikeCount(data.likeCount);
    if (data.liked) {
      alert("👍 했습니다")
    } else {
      alert("👍 취소했습니다")
    }
  };

  const getLikes = async () => {
    axiosInstance.get(`/unnamedlike?postId=${id}`)
      .then(response => {
        setLikeCount(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  if (loading)
    return <h1>로딩중 입니다....</h1>
  if (!board)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
    <div className="unnameddetail-container">
      <div className="unnameddetail-card">
        <h3>{board.title}</h3>
        <span>{localTime(board.createDate)}&nbsp;|&nbsp;
          <span><FontAwesomeIcon icon={faEye} />&nbsp;{board.cnt}&nbsp;|</span>
          <span>&nbsp;<FontAwesomeIcon icon={faThumbsUp} />&nbsp;{likeCount}</span>
        </span>
        <hr />
        <p>{board.content}</p>
        <button onClick={onClickLike}>
          &nbsp;<FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <hr />
        <h5>댓글 목록</h5>
        <table>
          <thead>
            <tr>
              <th>작성자</th>
              <th>내용</th>
              <th>작성일</th>
              <th>수정삭제</th>
            </tr>
          </thead>
          <tbody>
            {board.replyList && board.replyList.length > 0 ? (
              board.replyList.map((reply, i) => (
                <tr key={i} className="postdetail-reply">
                  {
                    userInfo == reply.user.id ? <td>나</td> : <td>익명</td>
                  }
                  {editingReplyId === reply.id ? (
                    <>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)} />
                      <button onClick={() => {
                        reply.content = document.querySelector('textarea').value
                        reply.id = editingReplyId
                        axiosInstance.put(`/unnamedReply/${id}`, reply)
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
                      <button onClick={handleCancel}>취소</button>
                    </>
                  ) : (
                    <><td>{reply.content}</td>
                      <td>{formatTime(reply.createDate)}</td>
                      <td className="reply-action">
                        {
                          userInfo && (userInfo === reply.user.id) && (
                            <button onClick={() => handleEditClick(reply)}>수정</button>
                          )
                        }
                      </td>
                    </>
                  )}
                  {
                    userInfo && (userInfo === reply.user.id) && (
                      <td><button onClick={() => {
                        axiosInstance.delete(`/unnamedReply/${reply.id}`)
                          .then(response => {
                            alert(response.data);
                            fetchPost();
                          }).catch(error => {
                            alert(error.response.data);
                            console.log(error)
                          })
                      }}>삭제</button></td>
                    )
                  }
                </tr>
              ))
            ) : (
              <tr>댓글이 없습니다.</tr>
            )}
          </tbody>
        </table>
        <textarea
          value={replyContent}
          onChange={e => setReplyContent(e.target.value)}
        />
        <button onClick={() => {
          if (!replyContent.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
          }
          const reply = {
            content: replyContent
          }
          axiosInstance.post(`/unnamedReply/${id}`, reply)
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
  )
}

export default UnnamedDetail;