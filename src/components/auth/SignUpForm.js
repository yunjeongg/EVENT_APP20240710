import React, { useEffect, useState } from 'react';
import styles from './SignUpForm.module.scss';
import EmailInput from './EmailInput';
import VerificationInput from './VerificationInput';
import ProgressBar from '../ProgressBar';
import PasswordInput from './PasswordInput';

const SignUpForm = () => {

  // step 의 단계가 몇단계인지 알 수 있는 상태변수
  const [step, setStep] = useState(1);

  // 단계가 성공적으로 완료되었는지 알 수 있는 상태변수
  const [success, setSuccess] = useState(false);

  // 입력된 이메일
  const [enteredEmail, setEnteredEmail] = useState('');

  // 입력된 패스워드
  const [enteredPassword, setEnteredPassword] = useState('');

  const [passwordIsValid, setPasswordIsValid] = useState(false);

  // 회원가입 버튼 활성화 여부
  const [activeButton, setActiveButton] = useState(false);

   // 다음 단계로 넘어가는 함수
   const nextStep = () => {
    setSuccess(true);

    setTimeout(() => {
      setStep(prevStep => prevStep + 1);
      setSuccess(false);
    }, 1500);
  };

  // 이메일 중복확인이 끝났을 때 호출될 함수
  const emailSuccessHandler = (email) => {
    setEnteredEmail(email);
    nextStep();
  };

  const passwordSuccessHandler = (password, isValid) => {

    // 잘 입력했을 경우 form 이 가지고 있는 정보
    setEnteredPassword(password);
    setPasswordIsValid(isValid);
  }

  useEffect (() => {

    // 활성화 여부 감시
    const isActive = enteredEmail && passwordIsValid;

    setActiveButton(isActive);

  }, [enteredEmail, passwordIsValid]); // 이 조건에 따라 useEffect 가 다시 실행

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>

        { step === 1 && <EmailInput onSuccess={emailSuccessHandler} /> }

        { step === 2 && <VerificationInput email={enteredEmail} onSuccess={() => nextStep()} /> }

        { step === 3 && <PasswordInput onSuccess={passwordSuccessHandler} /> }

        { activeButton && 
          <div>
            <button>
              회원가입 완료
            </button>
          </div>
        }

        { success && <ProgressBar /> }

      </div>
    </div>
  );
};

export default SignUpForm;
