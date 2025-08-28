import React from 'react';
import "./WebChat.css";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";


function WebChat() {

  const [stompClient, setStompClient] = useState(null);
  // 수신된 모든 메시지를 저장할 배열
  const [receivedMessages, setReceivedMessages] = useState([]);
  // 전송할 메시지 내용을 저장할 문자열
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {

    const socket = new SockJS("http://localhost:8888/ws", null ,{
        withCredentials: true
    });
    const client = over(socket);

    console.log("웹소켓 연결 시도");

    const jwt = sessionStorage.getItem('jwt');
    client.connect(
      { Authorization: jwt }, // JWT 토큰을 헤더로 포함
      () => {
        console.log("웹소켓 연결 성공");
        setStompClient(client);
        client.subscribe("/sub/messages", (message) => {
          console.log(message);
          setReceivedMessages((prev) => [...prev, message.body]);
        });
      },
      (error) => {
        console.log("웹소켓 연결 실패", error);
      }
    );
  }, []);

  const sendMessage = () => {
    if (stompClient && inputMessage.trim()) {
      stompClient.send("/pub/send", {}, inputMessage);
      setInputMessage("");
    }
  };

  const endConnection = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("웹소켓 연결 종료");
        setStompClient(null);
      });
    }
  };

  return (
    <div>
      <h1>웹소켓 채팅</h1>
      <div>
        <input
          type="text"
          placeholder="메시지"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage}>메시지 전송</button>
        <button onClick={endConnection}>연결 종료</button>
      </div>

      <ul>
        {receivedMessages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebChat;