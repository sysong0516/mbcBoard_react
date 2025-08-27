import UseNavi from "../UseNavi";
import "./PostDetail.css";

const PostDetail = () => {
  const {goTo} = UseNavi();

  return(
    <div className="postdetail-container">
      <div className="postdetail-card">
        <h3>제목</h3>
        <hr />
        <p>내용</p>
        <div className="postdetail-buttons">
          <button onClick={() => {
            goTo('/post/modify/:id') //id 부분에 실제 id 값을 넣어야 함
          }}>수정</button>
          <button>삭제</button>
        </div>
        <hr />
        <h5>댓글 목록</h5>
        <p>작성자</p>
        <p>댓글 내용</p>
        <textarea />
        <button>댓글 등록</button>
      </div>
    </div>
  )
}

export default PostDetail;