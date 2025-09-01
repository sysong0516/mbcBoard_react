import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { data } from "@remix-run/router";

const ReceivedMessage = () => {
  const [messages, setMessages] = useState([]); // 메세지들이라서 배열 형태로
  const [show,setShow] = useState(false); // 체크박스 보이게 안 보이게
  const [select,setSelect] = useState([]); // 체크박스 선택 한 것들 값을 저장

  useEffect(() => {
    // 받은 메세지 불러오기
    axiosInstance.get('/messages/received')
    .then(responsse => {
      setMessages(responsse.data);
      
    })
    .catch(error => {
      console.error(error);
    })
  },[]); 

  const showHandle = () => { 
    setShow(true);
  };

  const seletHandle = (id) => {
      setSelect(prev => {
        return prev.includes(id) ? 
        prev.filter(i => i !== id)
        :
        [...prev,id] 
      })        
  };

  const deleteHandle = () => {
    
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
  };

  return(
    <div>

      <h2>받은 메세지</h2>
      <button onClick={show ? deleteHandle : showHandle}>삭제</button>

      <ul>
        {messages.map( (msg,i)=>{
          return(
            <li key={msg.id} >
              {show ? <input type="checkbox" onChange={()=>seletHandle(msg.id)}/> : <></> }<p>보낸 사람 : {msg.sender.username}<br/>내용 : {msg.content}</p>
            </li>
          );
        })}
        
      
      </ul>

    </div>
  )
}

export default ReceivedMessage;