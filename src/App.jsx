import { useEffect, useState } from 'react'
import './App.css'
import axiosInstance from './axiosInstance';

function App() {
  const [test,setTest] = useState();

  useEffect(() => {
    axiosInstance.get("/test")
     .then(response => {
      setTest(response.data)
     }).catch(error => {
      console.log(error)
     })
  },[])

  return (
    <>
      <h1>{test}</h1>
      
    </>
  )
}

export default App
