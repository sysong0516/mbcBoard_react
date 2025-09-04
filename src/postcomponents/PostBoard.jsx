import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import UseNavi from "../utils/UseNavi";
import PostEditor from "../components/PostEditor";

const PostBoard = () => {
  const {goTo} = UseNavi();
  const [post,setPost] = useState({
      'title': '',
      'content' : '',
      'cnt' : 0,
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
    <div style={{position:'relative'}}>
      <PostEditor
        value={post.content}
        title={post.title}
        onTitleChange={title => setPost({...post, title})}
        onChange={onEditorChange}
        onSubmit={() => {
          axiosInstance.post('/post/write', post)
            .then(response => {
              alert(response.data)
              goTo('/post')
            }).catch(error => {
              console.error(error)
            })
        }}
      />
    </div>
  )
}

export default PostBoard;