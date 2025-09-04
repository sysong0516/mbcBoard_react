import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../utils/UseNavi";

import RouletteIcon from "../components/RouletteIcon";


import "./MainPage.css";



const MainPage = () => {
  const { goTo } = UseNavi();
  const handleRoulette = () => {
    goTo('/randomuser');
  };

  return(
    <div className="mainpage-container">
      <div className="mainpage-card">
        <UnamedPost url={'/post'} title={'공부 게시판'}/>
      </div>
      <div className="mainpage-card">
        <UnamedPost url={'/unnamed'} title={'익명 게시판'} />
      </div>
      <RouletteIcon onClick={handleRoulette} />
    </div>
  )
}

export default MainPage;