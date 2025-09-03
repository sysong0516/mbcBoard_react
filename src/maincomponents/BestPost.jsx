import UnamedPost from "./UnamedPost";

const BestPost = () => {
return(
  <>
    <UnamedPost url={'/best'} title={'공부Top5'} />
    <UnamedPost url={'/unnamedBest'} title={'익명Top5'} />
  </>
)
}

export default BestPost;