import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import "./WebChat.css";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const WebChat = forwardRef((props, ref) => {
  useEffect(() => {
    const socket = new SockJS("http://localhost:8888/ws", null, {
      withCredentials: true
    });
    const client = over(socket);

<<<<<<< HEAD
=======
    // console.log("웹소켓 연결 시도");

>>>>>>> develop
    const jwt = sessionStorage.getItem('jwt');
    let subscription;
    client.connect(
      { Authorization: jwt },
      () => {
<<<<<<< HEAD
        setStompClient(client);
        subscription = client.subscribe("/sub/messages", (message) => {
          let parsed;
          try {
            parsed = JSON.parse(message.body);
          } catch {
            parsed = { username: '알수없음', text: message.body };
          }
          setReceivedMessages((prev) => [...prev, parsed]);
=======
        // console.log("웹소켓 연결 성공");
        setStompClient(client);
        client.subscribe("/sub/messages", (message) => {
          // console.log(message);
          setReceivedMessages((prev) => [...prev, message.body]);
>>>>>>> develop
        });
      },
      (error) => {
        // console.log("웹소켓 연결 실패", error);
      }
    );

    return () => {
      if (subscription) subscription.unsubscribe();
      if (client) {
        try {
          client.disconnect(() => {});
        } catch (e) {}
      }
    };
  }, []);
  const [stompClient, setStompClient] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState(() => {
    const saved = sessionStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) inputRef.current.focus();
    }
  }));

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  const username = sessionStorage.getItem('username');

  const sendMessage = () => {
    if (stompClient && inputMessage.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const payload = JSON.stringify({ username, text: inputMessage, time });
      stompClient.send("/pub/send", {}, payload);
      setInputMessage("");
    }
  };

  const endConnection = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        // console.log("웹소켓 연결 종료");
        setStompClient(null);
      });
    }
  };

  // 로그아웃 시 채팅 기록 삭제 (window 이벤트 리스너 활용)
  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('chatMessages');
    };
    window.addEventListener('logout', handleLogout);
    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return (
    <div className="webchat-container">
  <div className="webchat-messages" ref={messagesRef}>
        <ul style={{margin:0, padding:0, listStyle:'none'}}>
          {receivedMessages.map((msg, idx) => {
            let username, text;
            if (typeof msg === 'string') {
              try {
                const parsed = JSON.parse(msg);
                username = parsed.username || '알수없음';
                text = parsed.text || msg;
              } catch {
                username = '알수없음';
                text = msg;
              }
            } else {
              username = msg.username || '알수없음';
              text = msg.text || '';
            }
            return (
              <li key={idx} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span><strong>{username}</strong>: {text}</span>
                <span style={{fontSize:'0.9em', color:'#888', marginLeft:'8px'}}>{msg.time ? msg.time : ''}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="webchat-input-area">
        <input
          ref={inputRef}
          type="text"
          placeholder="메시지를 입력하세요.."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          style={{flex:1}}
        />
        <button onClick={sendMessage}>메시지 전송</button>
        <button onClick={endConnection}>연결 종료</button>
      </div>
    </div>
  );
});

export default WebChat;