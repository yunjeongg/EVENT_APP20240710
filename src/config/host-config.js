
const LOCAL_PORT = 8686; // 백엔드 로컬 서버 포트번호 (변경시 여기만 수정하면 된다.)

// 지금 요청하는 브라우저의 host 가 http://localhost:3000 이라면
// hostname 은 localhost만 리턴한다.

// https://www.naver.com => hostname 은 www.naver.com 만 리턴한다.
const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') { // 클라이언트 가 localhost일 때, 
  backendHostName = 'http://localhost:' + LOCAL_PORT;
} else if (clientHostName === 'www.bananagrape.co.kr') {
  backendHostName = 'https://api.myapi.com';
}

const API_BASE_URL = backendHostName;

const EVENT = '/events';

export const EVENT_URL = API_BASE_URL + EVENT;