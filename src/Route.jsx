import { Route, Routes } from "react-router-dom"
import MainPage from "./mainpage/MainPage"
import { lazy, Suspense } from "react"
import ProtectedRoute from "./ProtectedRoute"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
const BestPost = lazy(() => import("./maincomponents/BestPost"))
const Unnamed = lazy(()=> import("./components/Unnamed"))
const UnnamedDetail = lazy(()=> import("./unnamedpost/UnnamedDetail"))
const UnnamedWrite = lazy(()=> import("./unnamedpost/UnnamedWrite"))
const Post = lazy(()=> import("./components/Post"))
const PostDetail= lazy(()=> import("./postcomponents/PostDetail"))
const PostBoard = lazy(()=> import("./postcomponents/PostBoard"))
const UpdatePost = lazy(()=> import("./postcomponents/UpdatePost"))
const RandomUser = lazy(()=> import("./components/RandomUser"))
const Privacy= lazy(()=> import("./maincomponents/Privacy"))
const Terms = lazy(()=> import("./maincomponents/Terms"))
const Message  = lazy(()=> import("./chat/Message"))
const WriteMessage = lazy(()=> import("./message-components/WriteMessage"))
const ReceivedMessage = lazy(()=> import("./message-components/ReceivedMessage"))
const SentMessage = lazy(()=> import("./message-components/SentMessage"))



const Routers = ({auth,setAuth}) => {
  return(
    <Suspense fallback={<div>로딩중임...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="login" element={<Login setAuth={setAuth}/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="hot" element={<BestPost />} />
        <Route path="/unnamed" element={<Unnamed />} />
        <Route path="/unnamed/:id" element={<UnnamedDetail />} />
        <Route path="/unnamed/write" element={<ProtectedRoute auth={auth}><UnnamedWrite /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute auth={auth}><Post /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute auth={auth}><PostDetail /></ProtectedRoute>} />
        <Route path="/post/write" element={<ProtectedRoute auth={auth}><PostBoard /></ProtectedRoute>} />
        <Route path="/post/modify/:id" element={<ProtectedRoute auth={auth}><UpdatePost  /></ProtectedRoute>} />
        <Route path="/randomuser" element={<RandomUser />} />
        <Route path="/message" element={<ProtectedRoute auth={auth}><Message/></ProtectedRoute>} >
          <Route path="write" element={<ProtectedRoute auth={auth}><WriteMessage /></ProtectedRoute>}/>
          <Route index element={<ProtectedRoute auth={auth}><ReceivedMessage /></ProtectedRoute>}/>
          <Route path="sentMessage" element={<ProtectedRoute auth={auth}><SentMessage /></ProtectedRoute>}/>
          <Route path="receivedMessage" element={<ProtectedRoute auth={auth}><ReceivedMessage /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Routers