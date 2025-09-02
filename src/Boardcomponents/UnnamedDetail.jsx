import { useParams } from "react-router-dom";
import "./UnnamedDetail.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import localTime from "../localTime";


const UnnamedDetail = () => {
  const [board, setBoard] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

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
        {board.replyList && board.replyList.length > 0 ? (
          board.replyList.map((reply, i) => (
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
                <><p>{reply.content}</p>
                  {
                    userInfo && (userInfo === reply.user.id) && (
                      <button onClick={() => handleEditClick(reply)}>수정</button>
                    )
                  }
                </>
              )}
              {
                userInfo && (userInfo === reply.user.id) && (
                  <button onClick={() => {
                    axiosInstance.delete(`/unnamedReply/${reply.id}`)
                      .then(response => {
                        alert(response.data);
                        fetchPost();
                      }).catch(error => {
                        alert(error.response.data);
                        console.log(error)
                      })
                  }}>삭제</button>
                )
              }
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
          axiosInstance.post(`/unnamedReply/${id}`, reply)
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

export default UnnamedDetail;