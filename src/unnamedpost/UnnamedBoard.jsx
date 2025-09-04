import { useState } from "react";
import UseNavi from "../utils/UseNavi";
import axiosInstance from "../utils/axiosInstance";

const UnnamedBoard = () => {
  const {goTo} = UseNavi();
  const [board,setBoard] = useState({
      'title': '',
      'content' : '',
      'cnt' : 0,
  });

  const onChangeHandler = (e) => {
    setBoard({
      ...board,
      [e.target.name] : e.target.value
    })
  };
  
  return(
    <div>
      <label for="title">제목&nbsp;&nbsp;</label>
      <input type="text" name="title" onChange={onChangeHandler} /><br />
      <label for="content">내용&nbsp;&nbsp;</label>
      <textarea name="content" onChange={onChangeHandler} />
      <div>
        <button onClick={() => {
          axiosInstance.post('/unnamed/write', board)
            .then(response => {
              alert(response.data)
              goTo('/unnamed')
            }).catch(error => {
              console.error(error)
            })
        }}>등록</button>
      </div>
    </div>
  )
}

export default UnnamedBoard;