import React, { useEffect, useRef } from 'react'
import styles from './SignUpForm.module.scss';

const VerificationInput = () => {

  // 여러개의 (반복문등) 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]); // useRef 의 [] 가 current

  // 다음 칸으로 포커스를 이동하는 함수
  const focusNextInput = ( index ) => {

    // 맨 마지막 칸에 갔을 때 포커싱 제거하기
    if (index < inputsRef.current.length) { 
      inputsRef.current[index].focus();
    }

  };

  const changeHandler = (index) => {
    // 입력이 끝나면 다음 칸으로 포커스 이동하기, 다음다음다음...
    focusNextInput(index);
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
                  onChange={(e) => changeHandler(index + 1)}
              />
          ))
        }

      </div>

    </>
  )
}

export default VerificationInput