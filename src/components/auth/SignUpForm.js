import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import EmailInput from './EmailInput';
import VerificationInput from './VerificationInput';
import ProgressBar from '../ProgressBar';

const SignUpForm = () => {

  // step 의 단계가 몇단계인지 알 수 있는 상태변수
  const [step, setStep] = useState(1);

  // 단계가 성공적으로 완료되었는지 알 수 있는 상태변수
  const [success, setSuccess] = useState(false);

  // 입력된 이메일
  const [enteredEmail, setEnteredEmail] = useState('');

  // 이메일 중복확인이 끝났을 때 호출될 함수
  const emailSuccessHandler = (email) => {

    // step 1 이메일 중복확인 했을 경우
    setSuccess(true);

    setEnteredEmail(email);

    setTimeout(() => {

      // step 2 인증코드 시작
      setStep(2);
      setSuccess(false);

    }, 1500);
  };

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>

        { step === 1 && <EmailInput onSuccess={emailSuccessHandler} /> }

        { step === 2 && <VerificationInput email={enteredEmail} /> }

        { success && <ProgressBar /> }

      </div>
    </div>
  );
};

export default SignUpForm;
