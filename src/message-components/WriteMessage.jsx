import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const WriteMessage = () => {
  const navigate = useNavigate();
  const [to, setTo] = useState(''); // 받는 사람
  const [content, setContent] = useState(''); // 메세지 내용
  const [error, setError] = useState();


  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 막기

    if(!to.trim()){
      setError('받는 사람을 입력해주세요.');
      return; // 입력 없으면 전송 중단
    }

    setError(''); // 에러 초기화

     axiosInstance.post('/message',{
      receiverName : to,
      content: content,
     })
     .then(response => {
      console.log(response.data)
      setContent(response.data)    
      }).catch(error => {
        console.log(error)
      })


    // 전송 완료 후 보낸 메시지 페이지로 이동
    navigate('/message/sentMessage');
  };

  return(
   <div>
      <h2>쪽지 쓰기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="받는 사람"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <br />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit">보내기</button>
      </form>
    </div>
  );
};
export default WriteMessage;