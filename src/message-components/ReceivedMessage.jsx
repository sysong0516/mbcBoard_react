import { useState } from "react";

const ReceivedMessage = () => {
  const [messages, setMessages] = useState([]); // 메세지들이라서 배열 형태로
  const [loading, setLoading] = useState(true);

  return(
    <div>

      <h2>받은 메세지</h2>

      <ul>

        <li>

        </li>
      
      </ul>

    </div>
  )
}

export default ReceivedMessage;