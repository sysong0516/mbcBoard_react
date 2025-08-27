import UseNavi from "../UseNavi";

const PostMain = () =>  {
  const {goTo} = UseNavi();
  return(
    <div>
      <div className="post">
        <h2>공부 게시판</h2>
        <button onClick={() => {
          goTo('/post')
        }}>더보기&gt;</button>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>ㅋㅋㅋ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostMain;