import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
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

import RandomUser from './components/RandomUser';
import UnnamedBoard from './Boardcomponents/UnnamedBoard';
import PostBoard from './Boardcomponents/PostBoard';

import UpdatePost from './Boardcomponents/UpdatePost';
import Footer from './mainpage/Footer';
import Terms from './maincomponents/Terms';
import Privacy from './maincomponents/Privacy';
import Message from './components/Message';
import Send from './message-components/SentMessage';
import SentMessage from './message-components/SentMessage';
import ReceivedMessage from './message-components/ReceivedMessage';
import WriteMessage from './message-components/WriteMessage';

function App() {
  const [test, setTest] = useState();
  const [auth, setAuth] = useState(false);
 
  const location = useLocation();
  

  useEffect(() => {
    axiosInstance.get("/test")
      .then(response => {
        setTest(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);



  return (
    <div className="app-bg">
      <Header auth={auth} setAuth={setAuth} />
      <div className="app-container">
        <div className="app-card">
          {/* <h1 className="app-title">{test }</h1> */}
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<Login setAuth={setAuth} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/unnamed' element={<Unnamed />} />
            <Route path='/post' element={<Post />} />
            <Route path='/unnamed/:id' element={<UnnamedDetail />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/randomuser' element={<RandomUser />} />
            <Route path='/unnamed/write' element={<UnnamedBoard />} />
            <Route path='/post/write' element={<PostBoard />} />
            <Route path='/post/modify/:id' element={<UpdatePost />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} /> 

            <Route path='/message' element={<Message/>}>
              <Route path="write" element={<WriteMessage/>} />
              <Route index element={<ReceivedMessage/>} />
              <Route path="sentMessage" element={<SentMessage/>} />
              <Route path="receivedMessage" element={<ReceivedMessage/>} />
            </Route>
          </Routes>
        </div>
      </div>
      {location.pathname === "/" && <Footer />}
    </div>
  )
}

export default App
