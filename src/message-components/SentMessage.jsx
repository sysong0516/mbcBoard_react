import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const SentMessage = () => {
  const [messages, setMessages] = useState([]);

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

  return(
   <div>

      <h2>보낸 메세지</h2>

      <ul>
        {messages.map(msg => (
          <li key={msg.id}><p>받는 사람 : {msg.receiverName}<br/>내용 : {msg.content}</p></li>
        ))}
        
      
      </ul>

    </div>
  )
}

export default SentMessage;