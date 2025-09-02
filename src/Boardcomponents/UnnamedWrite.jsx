import { useState } from "react";
import axiosInstance from "../axiosInstance";
import UseNavi from "../UseNavi";
import PostEditor from "../components/PostEditor";

const UnnamedWrite = () => {
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
    <div style={{position:'relative'}}>
      <PostEditor
        value={post.content}
        title={post.title}
        onTitleChange={title => setPost({...post, title})}
        onChange={onEditorChange}
        onSubmit={() => {
          axiosInstance.post('/unnamed/write', post)
            .then(response => {
              alert(response.data)
              goTo('/unnamed')
            }).catch(error => {
              console.error(error)
            })
        }}
      />
    </div>
  )
}

export default UnnamedWrite;
