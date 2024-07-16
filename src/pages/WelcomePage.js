import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Main from '../components/Main';
import { useRouteLoaderData } from 'react-router-dom';

const WelcomePage = () => {

  console.log('WelcomePage 실행!');

  // 상위 Route 페이지의 loader 데이터 불러오기
  const userData = useRouteLoaderData('user-data'); // () 안에 loader 의 아이디 입력
  
  console.log('userData', userData);

  return (
  <>

    { !userData && <LoginForm /> }

    { userData && <Main /> }

  </>
  );
};

export default WelcomePage;
