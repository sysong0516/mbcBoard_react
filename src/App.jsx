import { useEffect, useState } from 'react'
import './App.css'
import axiosInstance from './axiosInstance';

import RandomUser from './RandomUser';

function App() {
  // const [test,setTest] = useState();

  // useEffect(() => {
  //   axiosInstance.get("/test")
  //    .then(response => {
  //     setTest(response.data)
  //    }).catch(error => {
  //     console.log(error)
  //    })
  // },[])

  return (
      <div>
        <RandomUser />
      </div>
  )
}

export default App
