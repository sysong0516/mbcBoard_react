import UseNavi from "../UseNavi";

const PostDetail = () => {
  const {goTo} = UseNavi();

  return(
    <div>
      <p>제목</p>
      <hr />
      <p>내용</p>
      <div>
        <button onClick={() => {
          goTo('/post/modify')
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
  )
}

export default PostDetail;