import React, { useEffect, useRef, useState } from 'react'
import styles from './SignUpForm.module.scss';
import { debounce } from 'lodash';
import { AUTH_URL } from '../../config/host-config';

const VerificationInput = ({ email }) => {

  // 여러개의 (반복문등) 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]); // useRef 의 [] 가 current

  // 입력한 인증코드 4자리 저장하기
  const [codes, setCodes] = useState(Array(4).fill('')); // 4개의 배열을 빈문자열로 채워놓기

  // 에러 메시지 저장
  const [error, setError] = useState('');

  // 타이머 시간
  const [timer, setTimer] = useState(300);

  // 다음 칸으로 포커스를 이동하는 함수
  const focusNextInput = ( index ) => {

    // 맨 마지막 칸에 갔을 때 포커싱 제거하기
    if (index < inputsRef.current.length) { 
      inputsRef.current[index].focus();
    }

  };

  // 서버에 검증요청 보내기
  // debounce 함수를 사용해 1.5 초 이후 검증요청보내기
  const verifyCode = debounce(async (code) => {
    // console.log('요청 전송!', code);

    const response = await fetch (`${AUTH_URL}/code?email=${email}&code=${code}`);
    const flag = await response.json();

    console.log('코드검증', flag);

    // 검증에 실패했을 때
    if(!flag) {
      setError('유효하지 않거나 만료된 코드입니다. 인증코드를 재발송합니다.');

      // 검증에 실패했을 경우 기존 인증코드 상태값 비우기
      setCodes(Array(4).fill(''));

      // 타이머 리셋시키기
      setTimer(300);

      // 포커스도 첫 칸으로 이동시키기
      inputsRef.current[0].focus();

      return;
    }

  }, 1500);

  const changeHandler = (index, inputValue) => {

    const updatedCodes = [ ...codes ];
    updatedCodes[index - 1] = inputValue ; // 원래인덱스에서 한칸씩 수정하기
    console.log('updatedCodes', updatedCodes);

    // 다음 칸 이동 전 codes 변수에 입력한 숫자 담아놓기
    setCodes(updatedCodes);

    // 입력이 끝나면 다음 칸으로 포커스 이동하기, 다음다음다음...
    focusNextInput(index);

    // 입력한 숫자 하나의 문자열로 합치기
    // join() : 배열안에 있는 요소를 전부 연결한다, join 앞에는 무조건 배열이 와야 한다.
    // join으로 합칠 경우 요소 사이 기본구분자 콤마(,) 가 들어가기 때문에 기본구분자 바꿔주기

    if (updatedCodes.length === 4 && index === 4) {
      const code = updatedCodes.join('');
      // console.log('code', code);

      // 합친 문자열 코드를 서버로 보내 인증코드 검증 요청 전송하기
      verifyCode(code);

    }
  
  }


  useEffect (() => {

    // 처음엔 첫번째 칸에 포커싱하기
    inputsRef.current[0].focus();

    // 타이머 설정
    const interValid = setInterval(() => {
      setTimer(prevTime => prevTime > 0 ? prevTime - 1 : 0 ); // 0 보다 크면 1초씩 깍고 0 보다 작으면 0으로 놓기
    }, 1000);

    // 타이머 리셋
    return () => {
      clearInterval(interValid);
    }

  }, []);
  return (
    <>
      <p>Step 2: 이메일로 전송된 인증번호 4자리를 입력해주세요.</p>
      <div className={styles.codeInputContainer}>

        {
          Array.from(new Array(4)).map(( _, index) => (

              <input 
                  // ref={(a) => console.log(a)} // ref 안에 콜백함수를 넣으면 나자신의 Dom $input을 반환한다.
                  ref={($input) => inputsRef.current[index] = $input } // inputsRef.current 로 적어줘야 useEffect 안에 접근가능
                  key={index}
                  type='text' 
                  className={styles.codeInput} 
                  maxLength={1} 

                  // index 번호 보내는 2가지 방법
                  // onChange={changeHandler.bind(null, index + 1)}
                  onChange={(e) => changeHandler(index + 1, e.target.value)}
                  value={codes[index]}
              />
          ))
        }

      </div>
      
      <div className={styles.timer} > {`${'0' + Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`} </div>

      {error && <p className={styles.errorMessage} > {error} </p>}

    </>
  )
}

export default VerificationInput