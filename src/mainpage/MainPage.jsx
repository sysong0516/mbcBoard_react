import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";

const MainPage = ( ) => {
  const {goTo} = UseNavi();

  return(
    <div>
    <button onClick={() => goTo('/randomuser')}>뽑기</button>
      <UnamedPost />
      
    </div>
  )
}

export default MainPage;