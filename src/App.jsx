import { useEffect, useState } from 'react'
import './App.css'
import axiosInstance from './axiosInstance';

import RandomUser from './RandomUser';

function App() {
  const [test, setTest] = useState();
  const [showRandomUser, setShowRandomUser] = useState(false);

  useEffect(() => {
    axiosInstance.get("/test")
      .then(response => {
        setTest(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);

  const handleShowRandomUser = () => {
    setShowRandomUser(true);
  };

  return (
    <div>
      <h1>{test}</h1>
      {!showRandomUser && (
        <button onClick={handleShowRandomUser}>당첨자 뽑기</button>
      )}
      {showRandomUser && <RandomUser />}
    </div>
  );
}

export default App
