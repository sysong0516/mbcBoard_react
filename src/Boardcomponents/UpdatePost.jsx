import { useEffect, useState } from "react";
import UseNavi from "../UseNavi";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const UpdatePost = () => {
  const {goTo} = UseNavi();
  const [post , setPost] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    axiosInstance.get(`/post/${id}`)
      .then(response => {
        setPost(response.data)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
  },[])

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  };


  return(
    <div>
      <label for="title">제목&nbsp;&nbsp;</label>
      <input type="text" name="title" value={post.title} onChange={onChangeHandler} /> <br />
      <label for="title">내용&nbsp;&nbsp;</label>
      <textarea name="content" value={post.content}  onChange={onChangeHandler}/>
      <div>
        <button onClick={() => {
          axiosInstance.put(`/post/modify?id=${post.id}`, post)
            .then(response => {
              alert(response.data)
              goTo(`/post/${id}`)
            }).catch(error => {
              console.error(error)
            })
        }} >수정 완료</button>
      </div>
    </div>
  )
}

export default UpdatePost;