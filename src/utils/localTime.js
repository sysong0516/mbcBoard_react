const localTime = (isoString) => {
  if(!isoString) return "";

  const serverUtcDate = new Date(isoString);
  const now = new Date();

  // 비교하는 날짜가 오늘인지 확인하는 로직
  const isToday =
    serverUtcDate.getFullYear() === now.getFullYear() && // 연도같음
    serverUtcDate.getMonth() === now.getMonth() &&      // 월 같음
    serverUtcDate.getDate() === now.getDate();          // 일 같음
  // 셋다 같으면 true 아니면 false

  if(isToday) {
    // 오늘이면 시간만
    return serverUtcDate.toLocaleTimeString("ko-KR", {
      hour: "2-digit", minute:"2-digit"
    });
  } else if(serverUtcDate.getFullYear() === now.getFullYear()) {
    // 같은 해 -> 월.일
    return serverUtcDate.toLocaleDateString("ko-KR", {
      month:"2-digit", day:"2-digit"
    });
  } else {
    // 다른 해 -> 연.월.일
    return serverUtcDate.toLocaleDateString("ko-KR", {
      year:"2-digit", month:"2-digit", day:"2-digit"
    })
  }
  
}

export default localTime;