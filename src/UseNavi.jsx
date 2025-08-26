import { useNavigate } from "react-router-dom"

const UseNavi = () => {
  const navigate = useNavigate();

  const goIndex = () => {
    navigate('/')
  }

  const goTo = () => {
    navigate(path)
  }

  return {goIndex, goTo}
}

export default UseNavi;