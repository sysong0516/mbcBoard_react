
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function RandomUser() {
  const [selected, setSelected] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [isPicking, setIsPicking] = useState(false);

  const pickWithDelay = (count, delay) => {
    const randomIndex = Math.floor(Math.random() * dummyUsers.length);
    setHighlight(dummyUsers[randomIndex].id);

    if (count > 10) {
      setSelected(dummyUsers[randomIndex]);
      setIsPicking(false);
      return;
    }
    setTimeout(() => {
      pickWithDelay(count + 1, delay + 40);
    }, delay);
  };

  const startPick = () => {
    if (isPicking) return;
    setIsPicking(true);
    setSelected(null);
    pickWithDelay(0, 80);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>랜덤 유저 뽑기 (더미데이터)</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '1rem',
        justifyItems: 'center',
        alignItems: 'center',
        margin: '2rem 0',
      }}>
        {dummyUsers.map((user) => (
          <motion.div
            key={user.id}
            animate={{
              scale: highlight === user.id ? 1.1 : 1,
              backgroundColor: highlight === user.id ? '#3B82F6' : '#f9f9f9',
              color: highlight === user.id ? '#fff' : '#000',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              width: '100%',
              maxWidth: '160px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {user.name}
            <div style={{ color: '#555', fontSize: '0.9rem' }}>@{user.username}</div>
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>ID: {user.id}</div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={startPick}
        disabled={isPicking}
        style={{
          padding: '0.75rem 2rem',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          cursor: isPicking ? 'not-allowed' : 'pointer',
          marginTop: '1rem',
          transition: 'background 0.2s',
        }}
      >
        랜덤 뽑기
      </button>

      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}
        >
          🎉 당첨: {selected.name} 🎉
        </motion.div>
      )}
    </div>
  );
}
