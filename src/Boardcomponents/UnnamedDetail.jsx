import UseNavi from "../UseNavi";
import "./UnnamedDetail.css";

const UnnamedDetail = () => {
  const {goTo} = UseNavi();
  return(
    <div className="unnameddetail-container">
      <div className="unnameddetail-card">
        <h3>제목</h3>
        <hr />
        <p>내용</p>
        <div className="unnameddetail-buttons">
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

export default UnnamedDetail;