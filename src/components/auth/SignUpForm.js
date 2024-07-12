import React, { useState } from 'react';
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

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>

        { step === 1 && <EmailInput onSuccess={emailSuccessHandler} /> }

        { step === 2 && <VerificationInput email={enteredEmail} onSuccess={() => nextStep()} /> }

        { step === 3 && <PasswordInput /> }

        { success && <ProgressBar /> }

      </div>
    </div>
  );
};

export default SignUpForm;
