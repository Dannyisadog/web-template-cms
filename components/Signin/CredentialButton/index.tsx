import style from "../Signin.module.css";

interface CredentialButtonProps {
  signin: () => void;
}

const CredentialButton = (props: CredentialButtonProps) => {
  const {
    signin
  } = props;

  return (
    <>
      <button
        onClick={signin}
        className={`${style.signin_button} ${style.credential_button}`}
      >
        Sign in
      </button>
    </>
  );
}

export default CredentialButton;