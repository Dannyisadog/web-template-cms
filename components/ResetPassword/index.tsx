import style from "./ResetPassword.module.css";
import { ResetPasswordProps } from "types/signin/PasswordProps";
import { useState, useRef } from "react";
import useFetch from "hooks/useFetch";
import Link from "next/link";

const ResetPassword = (props: ResetPasswordProps) => {
  const { email } = props;
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const { post } = useFetch({
    url: '/api/auth/resetPassword'
  })

  const reset = async () => {
    setErrorMsg("");
    const newPassword = newPasswordRef.current?.value;
    const newPasswordConfirm = newPasswordConfirmRef.current?.value;

    const data = {
      newPassword,
      newPasswordConfirm,
      email
    }
    
    const result = await post(data);

    if (!result.ok) {
      setErrorMsg(result.msg);
      return;
    }
    setSuccess(true);
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.password_container}>
          {errorMsg && <div className={style.error_msg}>{errorMsg}</div>}
          {success && 
            <div className={style.success_block}>
              <div>
                reset successfully
              </div>
              <div>
                <Link className="underline" href="/signin">go to signin</Link>
              </div>
            </div>
          }
          <input ref={newPasswordRef} className={style.input} type="password" placeholder="enter new password" />
          <input ref={newPasswordConfirmRef} className={style.input} type="password" placeholder="confirm" />
          <button className={style.reset_button} onClick={reset}>Reset Password</button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;