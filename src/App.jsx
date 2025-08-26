import { useEffect, useState } from 'react'
import './App.css'
import axiosInstance from './axiosInstance';
import { Route, Routes } from 'react-router-dom';
import MainPage from './mainpage/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './mainpage/Header';
import Unnamed from './components/Unnamed';
import Post from './components/Post';

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
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/unnamed' element={<Unnamed />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </>
  )
}

export default App
