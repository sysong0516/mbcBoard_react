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
import UnnamedDetail from './Boardcomponents/UnnamedDetail';
import PostDetail from './Boardcomponents/PostDetail';

import RandomUser from './RandomUser';
import UnnamedBoard from './Boardcomponents/UnnamedBoard';
import PostBoard from './Boardcomponents/PostBoard';
import UpdateBoard from './Boardcomponents/UpdateBoard';
import UpdatePost from './Boardcomponents/UpdatePost';

function App() {
  const [test, setTest] = useState();
  

  useEffect(() => {
    axiosInstance.get("/test")
      .then(response => {
        setTest(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);



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
        <Route path='/unnamed/:id' element={<UnnamedDetail />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/randomuser' element={<RandomUser />} />
        <Route path='/unnamed/write' element={<UnnamedBoard />} />
        <Route path='/post/write' element={<PostBoard />} />
        <Route path='/unnamed/modify' element={<UpdateBoard />} />
        <Route path='/post/modify' element={<UpdatePost />} />
      </Routes>
    </>
  )
}

export default App
