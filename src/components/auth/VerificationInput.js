import React, { useEffect, useRef, useState } from 'react'
import styles from './SignUpForm.module.scss';

const VerificationInput = () => {

  // 여러개의 (반복문등) 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]); // useRef 의 [] 가 current

  // 입력한 인증코드 4자리 저장하기
  const [codes, setCodes] = useState([]);

  // 다음 칸으로 포커스를 이동하는 함수
  const focusNextInput = ( index ) => {

    // 맨 마지막 칸에 갔을 때 포커싱 제거하기
    if (index < inputsRef.current.length) { 
      inputsRef.current[index].focus();
    }

  };

  // 서버에 검증요청 보내기
  const verifyCode = async (code) => {
    console.log('요청 전송!', code);
  }

  const changeHandler = (index, inputValue) => {

    const updatedCodes = [ ...codes, inputValue ];
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
              />
          ))
        }

      </div>

    </>
  )
}

export default VerificationInput