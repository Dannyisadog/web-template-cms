import style from "./RecoveryPassword.module.css";
import { useRef } from "react";
import useFetch from "hooks/useFetch";
import { RecoveryPasswordProps } from "types/recoveryPassword/RecoveryPasswordProps";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const ResetPassword = (props: RecoveryPasswordProps) => {
  const { sentCallback } = props;
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { post } = useFetch({
    url: '/api/mail/recoveryPassword'
  });

  const reset = async () => {
    const email = emailRef.current?.value;
    const data = {
      email
    };
    const result = await post(data);
    if (!result.ok) {
      setErrorMsg(result.msg)
      return;
    }
    sentCallback();
  }

  return (
    <>
      <div className={style.reset_container}>
        <CloseIcon className={style.close_icon} onClick={sentCallback} />
        {errorMsg && <div className={style.error_msg}>{errorMsg}</div>}
        <input ref={emailRef} className={style.email_input} type="email" placeholder="enter your email" />
        <button className={style.send_button} onClick={reset}>Send Reset Link</button>
      </div>
    </>
  );
}

export default ResetPassword;