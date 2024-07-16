import React from 'react'
import { Form, useRouteLoaderData } from 'react-router-dom'

const Main = () => {

  const {role, email} = useRouteLoaderData('user-data');

  return (
    <>
      <h2>{email}님 환영합니다.</h2>
      <h3>현재 권한: [ {role} ]</h3>

      {/* 다른 라우트의 액션을 트리거하는 방법 -> Form action 속성 사용 (서버로 보내는 것이 아닌, 클라이언트 내에서 /logout 를 발동) */}
      <Form action='/logout' method='POST'>
        <button>Logout</button>
      </Form>
    </>
  )
}

export default Main