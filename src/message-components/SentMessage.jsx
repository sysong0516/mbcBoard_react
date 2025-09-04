import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation } from "react-router-dom";
import localTime from "../utils/localTime";
import "./SentMessage.css";

const SentMessage = () => {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState([]);
  const location = useLocation();
 

  useEffect(() => {
    // 보낸 메세지 불러오기
    axiosInstance.get('/messages/sent')
      .then(response => {
        setMessages([...response.data]);

      })
      .catch(error => {
        console.error(error);
      })
  }, [location.pathname]);

  const showHandle = useCallback(() => {
    setShow(true);
  });

  const selectHandle = useCallback(
    (id) => {
    setSelect(prev => {
      return prev.includes(id) ?
        prev.filter(i => i !== id)
        :
        [...prev, id]
    })
  },[]);

  const deleteHandle = useCallback(() => {
    if (select.length === 0) {
    alert("삭제할 메시지를 선택해주세요.");
    return; 
    }

    axiosInstance.delete('/messages/delete/sender', {
      data: select
    })
      .then(response => {
        alert('삭제 완료 ');

        window.location.reload();
      }).catch(error => {
        console.error(error);
        alert('삭제 실패');
      })
  },[select]);

  const selectAllHandle = useCallback(() => {
    setSelect(prev => 
     prev.length === messages.length ? [] : messages.map(msg => msg.id) 
    )
  },[messages]);

  return (
    <div className="sent-container">

      <div className="sent-message-header">
        <h2>보낸 메세지</h2>

       {show && messages.length > 0 && (
        <label className="message-label">
          <input
            type="checkbox"
            className="message-checkbox"
            checked={select.length === messages.length && messages.length > 0}
            onChange={selectAllHandle}
          />
         전체선택
        </label>
        )}
        
        
        <button className="delete-btn" 
        onClick={show ? deleteHandle : showHandle}
        disabled={messages.length === 0}>삭제</button>
      </div>

      <ul className="message-list">
        {messages.length === 0 ?
          <p>보낸 메세지가 없습니다.</p>
          :

          (messages.map((msg, i) => {
            return (
              <li key={msg.id}>
                {show ? <input type="checkbox" 
                  className="message-checkbox"
                  checked={select.includes(msg.id)}
                  onChange={() => selectHandle(msg.id)} /> : <></>}
                <p>받는 사람 : {msg.receiverName}<br />
                  내용 : {msg.content}<br />
                  날짜 : {localTime(msg.createDate)}</p>
              </li>
            );
          }))
        }


      </ul>

    </div>
  )
}

export default SentMessage;