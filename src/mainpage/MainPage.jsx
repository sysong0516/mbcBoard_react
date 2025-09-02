import OffcanvasDemo from "../components/OffcanvasDemo";
import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";

import "./MainPage.css";


const MainPage = ( ) => {
  const {goTo} = UseNavi();

  return(
    <div className="mainpage-container">
      <div className="mainpage-card">
        <UnamedPost url={'/post'} title={'공부 게시판'}/>
      </div>
      <div className="mainpage-card">
        <UnamedPost url={'/unnamed'} title={'익명 게시판'} />
      </div>
      
      <button className="mainpage-btn" onClick={() => goTo('/randomuser')}>추첨</button>
    </div>
  )
}

export default MainPage;