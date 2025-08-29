import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { data } from "@remix-run/router";

const ReceivedMessage = () => {
  const [messages, setMessages] = useState([]); // 메세지들이라서 배열 형태로
  const [show,setShow] = useState(false); // 체크박스 보이게 안 보이게
  const [selet,setSelet] = useState([]); // 체크박스 선택 한 것들 값을 저장

  useEffect(() => {
    // 받은 메세지 불러오기
    axiosInstance.get('/messages/received')
    .then(responsse => {
      setMessages(responsse.data);
      console.log(responsse.data)
    })
    .catch(error => {
      console.error(error);
    })
  },[]); 

  const showHandle = () => { 
    setShow(true);
  };

//   const seletHandle = (id) => {
//       setSelet(prev => {
//         return prev.includes(id) ? 
//         prev.filter(i => i !== id)
//         :
//         [...prev,id] 
//       })        
//   };
//  console.log(id)

  const deleteHandle = () => {

  };

  return(
    <div>

      <h2>받은 메세지</h2>
      <button onClick={showHandle}>삭제</button>

      <ul>
        {messages.map( (msg,i)=>{
          return(
            <li key={msg.id} >
              {show ? <input type="checkbox" onChange={seletHandle}/> : <></> }<p>보낸 사람 : {msg.sender.username}<br/>내용 : {msg.content}</p>
            </li>
          );
        })}
        
      
      </ul>

    </div>
  )
}

export default ReceivedMessage;