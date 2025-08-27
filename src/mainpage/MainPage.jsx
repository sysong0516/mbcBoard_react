import PostMain from "../maincomponents/PostMain";
import UnamedPost from "../maincomponents/UnamedPost";
import UseNavi from "../UseNavi";


const MainPage = ( ) => {
  const {goTo} = UseNavi();

  return(
    <div>
      <UnamedPost />
      <PostMain />
      <button onClick={() => goTo('/randomuser')}>추첨</button>
      

    </div>
  )
}

export default MainPage;