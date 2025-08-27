import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";
import Footer from "./Footer";

const MainPage = ( ) => {
  const {goTo} = UseNavi();

  return(
    <div>
      <UnamedPost />
        <button onClick={() => goTo('/randomuser')}>추첨</button>
      <Footer />

    </div>
  )
}

export default MainPage;