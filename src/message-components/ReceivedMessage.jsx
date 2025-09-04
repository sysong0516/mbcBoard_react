import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useLocation } from "react-router-dom";
import localTime from "../localTime";
import "./ReceiverMessage.css"

const ReceivedMessage = () => {
  const [messages, setMessages] = useState([]); // 메세지들이라서 배열 형태로
  const [show,setShow] = useState(false); // 체크박스 보이게 안 보이게
  const [select,setSelect] = useState([]); // 체크박스 선택 한 것들 값을 저장
  const location = useLocation();

  useEffect(() => {
  
    // 받은 메세지 불러오기
    axiosInstance.get('/messages/received')
    .then(responsse => {
      setMessages([...responsse.data]);
      
    })
    .catch(error => {
      console.error(error);
    })
  },[location.pathname]); 


  const showHandle = useCallback(() => {
    setShow(true);
  }, []);

  const selectHandle = useCallback(
    (id) => {
      setSelect(prev => {
        return prev.includes(id) ? 
        prev.filter(i => i !== id)
        :
        [...prev,id] 
      })        
  },[]);

  const deleteHandle = useCallback(
    () => {
    if (select.length === 0) {
    alert("삭제할 메시지를 선택해주세요.");
    return; 
    }
    
    axiosInstance.delete('/messages/delete/receiver',{
      data : select
    })
    .then(responsse => {
      alert('삭제 완료');
      
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
  
  return(
    <div className="sent-container">
      <div className="sent-message-header">
        <h2>받은 메세지</h2>

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
        disabled={messages.length === 0} >삭제</button>
      </div>
      <ul className="message-list">
        {messages.length === 0 ?
        <p>받은 메세지가 없습니다.</p>
        :
        
        (messages.map( (msg,i)=>{
          return(
            <li key={msg.id} >
              {show ? <input type="checkbox" 
              className="message-checkbox"
              checked={select.includes(msg.id)}
              onChange={()=>selectHandle(msg.id)}/> : <></> }<p>보낸 사람 : {msg.sender.username}<br/>내용 : {msg.content}<br/>날짜 : {localTime(msg.createDate)}</p>
            </li>
          );
        }))   
        }

      </ul>

    </div>
  )
}

export default ReceivedMessage;