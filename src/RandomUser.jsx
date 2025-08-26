import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router-dom';


function RandomUser() {
  // 더미 유저 데이터 20명
  const dummyUsers = [
    { id: 1, name: '홍길동', username: 'hong' },
    { id: 2, name: '김철수', username: 'kim' },
    { id: 3, name: '이영희', username: 'lee' },
    { id: 4, name: '박민수', username: 'park' },
    { id: 5, name: '최지우', username: 'choi' },
    { id: 6, name: '정우성', username: 'jung' },
    { id: 7, name: '한지민', username: 'han' },
    { id: 8, name: '이준기', username: 'leejg' },
    { id: 9, name: '신세경', username: 'shin' },
    { id: 10, name: '박보검', username: 'parkbg' },
    { id: 11, name: '수지', username: 'suzy' },
    { id: 12, name: '유재석', username: 'yoo' },
    { id: 13, name: '강호동', username: 'kang' },
    { id: 14, name: '이광수', username: 'leeks' },
    { id: 15, name: '송지효', username: 'song' },
    { id: 16, name: '김종국', username: 'kimjk' },
    { id: 17, name: '하하', username: 'haha' },
    { id: 18, name: '양세찬', username: 'yang' },
    { id: 19, name: '전소민', username: 'jeon' },
    { id: 20, name: '조세호', username: 'jo' }
  ];
  const [users] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const pickRandomUser = () => {
    if (users.length === 0) return;
    const randomIdx = Math.floor(Math.random() * users.length);
    setSelectedUser(users[randomIdx]);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>랜덤 유저 뽑기 (더미데이터)</h2>
      <button onClick={pickRandomUser} disabled={users.length === 0} style={{ marginBottom: '1rem' }}>
        유저 랜덤 선택
      </button>
      {selectedUser && (
        <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#1976d2' }}>
          <strong>선택된 유저:</strong> {selectedUser.name}
        </div>
      )}
      {users.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <strong>전체 유저 목록:</strong>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(5, 1fr)',
              gap: '1rem',
              justifyItems: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            {users.map(u => (
              <div
                key={u.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '1rem',
                  width: '100%',
                  maxWidth: '160px',
                  background: '#f9f9f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{u.name}</div>
                <div style={{ color: '#555' }}>@{u.username}</div>
                <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>ID: {u.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RandomUser />
  </BrowserRouter>,
);
