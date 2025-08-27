import PostMain from "../maincomponents/PostMain";
import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";

import "./MainPage.css";


const MainPage = ( ) => {
  const {goTo} = UseNavi();

  return(
    <div className="mainpage-container">
      <div className="mainpage-card">
        <PostMain />
      </div>
      <div className="mainpage-card">
        <UnamedPost />
      </div>
      <button className="mainpage-btn" onClick={() => goTo('/randomuser')}>추첨</button>
    </div>
  )
}

export default MainPage;