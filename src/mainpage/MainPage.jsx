import OffcanvasDemo from "../components/OffcanvasDemo";
import PostMain from "../maincomponents/PostMain";
import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";

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
        <PostMain />
      </div>
      <div className="mainpage-card">
        <UnamedPost />
      </div>
      <RouletteIcon onClick={handleRoulette} />
    </div>
  )
}

export default MainPage;