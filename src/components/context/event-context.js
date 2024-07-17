import { createContext } from "react";

// 컨텍스트 생성 시 매개변수에 전역상태관리할 객체의 기본값을 넣어줘야 한다.
const EventContext = createContext({

  totalEventCount: 0, // 이벤트 게시글의 총 개수
  changeTotalEventCount: (count) => {} // 정의만 하고 EventProvider 에서 구체화하기
  
});

export default EventContext;