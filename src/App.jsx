import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'
import Header from './layout/Header';
import Footer from './layout/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Routers from './Route';

function App() {
  const [auth, setAuth] = useState(sessionStorage.getItem("jwt") ? true : false);

  const location = useLocation();


  return (
    <div className="app-bg">
      <Header auth={auth} setAuth={setAuth} />
      <div className="app-container">
        <div className="app-card">
          <Routers auth={auth} setAuth={setAuth} />
        </div>
      </div>
  
  <ScrollToTopButton />
      {location.pathname === "/" && <Footer />}
    </div>
  )
}

export default App
