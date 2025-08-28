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
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [test, setTest] = useState();
  const [auth, setAuth] = useState(sessionStorage.getItem("jwt") ? true : false);

  const location = useLocation();


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
            <Route path='/post' element={<ProtectedRoute auth={auth}><Post /></ProtectedRoute>} />
            <Route path='/unnamed/:id' element={<UnnamedDetail />} />
            <Route path='/post/:id' element={<ProtectedRoute auth={auth}><PostDetail /></ProtectedRoute>} />
            <Route path='/randomuser' element={<RandomUser />} />
            <Route path='/unnamed/write' element={<UnnamedBoard />} />
            <Route path='/post/write' element={<ProtectedRoute auth={auth}><PostBoard /></ProtectedRoute>} />
            <Route path='/post/modify/:id' element={<ProtectedRoute auth={auth}><UpdatePost /></ProtectedRoute>} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
          </Routes>
        </div>
      </div>
      {location.pathname === "/" && <Footer />}
    </div>
  )
}

export default App
