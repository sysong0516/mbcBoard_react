import { useState } from "react";
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";
import PostEditor from "../components/PostEditor";

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

  const onEditorChange = (html) => {
    setPost({
      ...post,
      content: html
    });
  };

  return(
    <div>
      <PostEditor value={post.content} onChange={onEditorChange} />
      <div style={{marginTop:'16px'}}>
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