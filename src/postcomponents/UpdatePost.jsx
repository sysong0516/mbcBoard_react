import { useEffect, useState } from "react";
import UseNavi from "../utils/UseNavi";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import PostEditor from "../components/PostEditor";

const UpdatePost = () => {
  const {goTo} = UseNavi();
  const [post , setPost] = useState({
    title: '',
    content: '',
    cnt: 0,
    
  });
  const {id} = useParams();

  useEffect(() => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data.post)
      }).catch(error => {
        console.log(error)
      })
  },[])

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  };

  if( !post.content ) {
    return <div>Loading...</div>;
  }
  return(
    <div style={{position:'relative'}}>
      <PostEditor
        value={post.content}
        title={post.title}
        onTitleChange={title => setPost({...post, title})}
        onChange={html => setPost({...post, content: html})}
        onSubmit={() => {
          axiosInstance.put(`/post/modify?id=${post.id}`, post)
            .then(response => {
              alert(response.data)
              goTo(`/post/${id}`)
            }).catch(error => {
              console.error(error)
            })
        }}
      />
    </div>
  )
}

export default UpdatePost;