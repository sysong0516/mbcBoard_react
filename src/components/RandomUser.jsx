import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';

export default function RandomUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [pickedIds, setPickedIds] = useState([]);

  useEffect(() => {
    axiosInstance.get('/userList')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('유저 정보를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  // 카드 셀렉 효과 (pickedIds에 없는 유저만 추첨)
  const pickWithDelay = (count, delay, candidates) => {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    setHighlight(candidates[randomIndex]?.id);
    if (count > 10) {
      setSelected(candidates[randomIndex]);
      setPickedIds(prev => [...prev, candidates[randomIndex].id]);
      setIsPicking(false);
      return;
    }
    setTimeout(() => {
      pickWithDelay(count + 1, delay + 40, candidates);
    }, delay);
  };

  const startPick = () => {
    if (isPicking) return;
    const candidates = users.filter(u => !pickedIds.includes(u.id));
    if (candidates.length === 0) return;
    setIsPicking(true);
    setSelected(null);
    pickWithDelay(0, 80, candidates);
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'2rem'}}>로딩 중...</div>;
  if (error) return <div style={{textAlign:'center', color:'red', marginTop:'2rem'}}>{error}</div>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>유저 목록</h2>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}
        >
          🎉 당첨: {selected.name} (@{selected.username}) 🎉
        </motion.div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        justifyItems: 'center',
        alignItems: 'center',
        margin: '2rem 0',
      }}>
        {users.map((user) => {
          const isPicked = pickedIds.includes(user.id);
          return (
            <motion.div
              key={user.id}
              animate={{
                scale: highlight === user.id ? 1.1 : 1,
                backgroundColor: isPicked
                  ? '#888' // 당첨자는 어둡게
                  : highlight === user.id
                  ? '#3B82F6'
                  : '#f9f9f9',
                color: isPicked
                  ? '#fff'
                  : highlight === user.id
                  ? '#fff'
                  : '#000',
                opacity: isPicked ? 0.6 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                width: '100%',
                maxWidth: '160px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
              {isPicked && <div style={{fontSize:'0.8rem', color:'#fff', marginTop:'0.5rem'}}>당첨됨</div>}
            </motion.div>
          );
        })}
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
    </div>
  );
}
