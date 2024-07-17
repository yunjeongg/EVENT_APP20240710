import React from 'react'
import { Form, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { AUTH_URL } from '../config/host-config';

const Main = () => {

  const navigate = useNavigate();

  const {role, email, token} = useRouteLoaderData('user-data');

  const promoteHandler = async (e) => {
    
    const response = await fetch (`${AUTH_URL}/promote`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + token}
    });

    if (!response.ok) {
      alert("올바르지 않은 권한수정 요청입니다.");
      return;
    }

    const responseData = await response.json();

    // 등급 변경된 정보를 토큰에 갱신하기
    localStorage.setItem('userData', JSON.stringify(responseData));

    alert('프리미엄 회원이 되신 것을 축하드립니다.')
    navigate('/');
  };

  return (
    <>
      <h2>{email}님 환영합니다.</h2>
      <h3>현재 권한: [ {role} ]</h3>

      { role === 'COMMON' &&
        <button 
                style={{background:'orangered', color: 'white'}}
                onClick={promoteHandler} 
        >
          Go To Premium
        </button>
      }

      {/* 다른 라우트의 액션을 트리거하는 방법 -> Form action 속성 사용 (서버로 보내는 것이 아닌, 클라이언트 내에서 /logout 를 발동) */}
      <Form action='/logout' method='POST'>
        <button>Logout</button>
      </Form>
    </>
  )
}

export default Main