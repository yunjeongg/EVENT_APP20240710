import React from 'react';
import { Form, Link, redirect, useActionData } from 'react-router-dom';  // Link 컴포넌트 추가
import styles from './LoginForm.module.scss';
import { AUTH_URL } from '../../config/host-config';

// 
const LoginForm = () => {

  const errorText = useActionData();
  
  return (
    <>
      <Form method="post" className={styles.form}>
        <h1>내가산도메인 로그인</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required/>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required/>
        </p>
        <div className={styles.actions}>
          <button type="submit" className={styles.loginButton}>Login</button>
        </div>

        { errorText && <p className={styles.error}> {errorText} </p> }

        <div className={styles.registerLink}>
          <Link to="/sign-up">회원이 아니십니까? 회원가입을 해보세요</Link>
        </div>
      </Form>
    </>
)};

export default LoginForm;

// login form에 대한 트리거 함수
export const loginAction = async ({ request }) => {

  // 입력데이터를 읽기
  const formData = await request.formData();
  
  const payload = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  // console.log(payload);

  const response = await fetch(`${AUTH_URL}/sign-in`, {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(payload)
  });

  // 로그인이 실패한 경우 (status - 422 인 경우)
  if (response.status === 422) {
    const errorText = await response.text();
    console.log(errorText);

    // 액션함수가 리턴한 데이터를 컴포넌트에서 쓰는 법
    // -> 컴포넌트에서 useActionData 훅을 사용한다.
    return errorText;
  }

  // 로그인이 성공한 경우
  const responseData = await response.json();
  // console.log(responseData); // 로그인 성공 시 서버가 나에게 준 인증서

  // 인증서를 브라우저 저장소에 저장 (localStorage : 쿠키(자동로그인느낌, 브라우저 꺼도 안사라짐), sessionStorage : 세션(일반로그인느낌, 브라우저 끄면 사라짐))
  localStorage.setItem('userData', JSON.stringify(responseData)); // json 으로 변환해서 저장하기
  // f12 - Application - localStorage - localhost:3000 - key & value
  
  // redirect() 메소드를 사용하려면 return 사용해야 한다.
  return redirect('/');

};

