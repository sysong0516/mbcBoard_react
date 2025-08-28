import { useState } from "react";
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";

const PostBoard = () => {
  const {goTo} = UseNavi();
  const [post,setPost] = useState({
      'title': '',
      'content' : '',
      'cnt' : 0,
      'likes': 0
  });

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  };

  return(
    <div>
      <label for="title">제목&nbsp;&nbsp;</label>
      <input type="text" name="title"  onChange={onChangeHandler}/> <br />
      <label for="content">내용&nbsp;&nbsp;</label>
      <textarea name="content" onChange={onChangeHandler} />
      <div>
        <button onClick={() => {
          axiosInstance.post('/post/write', post)
            .then(response => {
              alert(response.data)
              goTo('/post')
            }).catch(error => {
              console.error(error)
            })
        }}>등록</button>
      </div>
    </div>
  )
}

export default PostBoard;