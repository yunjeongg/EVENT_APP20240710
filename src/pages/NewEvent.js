import React, { useContext, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import EventContext from '../components/context/event-context';

const NewEvent = () => {

  const navigate = useNavigate();

  const { totalEventCount } = useContext(EventContext);

  const { role } = useRouteLoaderData('user-data');

  // 라우트 가드 (권한, 개수 검증하기)
  useEffect(() => {
    if (role === 'COMMON' && totalEventCount >= 4) { // 권한이 COMMON 이면서, 총 작성게시글이 4개 이상인 경우

      alert('일반회원은 이벤트생성이 4개로 제한됩니다.');
      navigate('/events');
    }
  }, [totalEventCount]);

  return <EventForm method="post" />;
};

export default NewEvent;

