import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const SentMessage = () => {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    // 보낸 메세지 불러오기
    axiosInstance.get('/messages/sent')
    .then(response => {
      setMessages(response.data);

    })
    .catch(error => {
      console.error(error);
    })
  },[]);

  const showHandle = () =>{
    setShow(true);
  };

  const selectHandle = (id) => {
    setSelect(prev => {
      return prev.includes(id) ? 
      prev.filter(i => i !== id)
      :
      [...prev,id]
    })
  };

  const deleteHandle = () => {
    axiosInstance.delete('/messages/delete/sender',{
      data : select
    })
    .then(response => {
      alert('삭제 완료 ');

      window.location.reload();
    }).catch(error => {
      console.error(error);
      alert('삭제 실패');
    })
  };

  return(
   <div>

      <h2>보낸 메세지</h2>
      <button onClick={show ? deleteHandle : showHandle}>삭제</button>

      <ul>
        {messages.map( (msg,i) => {
          return(
             <li key={msg.id}>
            {show ? <input type="checkbox" onChange={()=>selectHandle(msg.id)}/> : <></>}<p>받는 사람 : {msg.receiverName}<br/>내용 : {msg.content}</p>
            </li>
          );
        })}

      </ul>

    </div>
  )
}

export default SentMessage;