import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import styles from './MainNavigation.module.scss';

const MainNavigation = () => {

  // 로그인 한 경우 로그아웃 버튼 표시, 아니면 미표시
  const userData = useRouteLoaderData('user-data');

  const activeFn = ({ isActive }) => {
    // NavLink 컴포넌트에 className프롭스에 함수를 전달하면
    // 첫번째 파라미터에 어떤 객체정보를 준다.
    // console.log(aa);
    return isActive ? styles.active : undefined;
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink to='' className={activeFn} end>홈</NavLink>
          </li>
          <li>
            <NavLink to='events' className={activeFn}>이벤트들</NavLink>
          </li>

          {userData && (
            <li>

              <Form action='/logout' method='POST'>
                <button style={{ width: '100%' }}>Logout</button>
              </Form>
              
            </li>
          )}


        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation