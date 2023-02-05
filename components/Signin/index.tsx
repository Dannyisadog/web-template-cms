import SigninProps from "types/signin/SigninProps"
import { signIn } from "next-auth/react";
import style from "./Signin.module.css";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Link from "next/link";
import { useRef, useState } from "react";
import CredentialButton from "./CredentialButton";
import Image from "next/image";
import BgImage from "public/signin-bg.jpg";
import RecoveryPassword from "components/RecoveryPassword";
import FullPageLoader from "components/FullPageLoader";

const SigninPage = (props: SigninProps) => {
  const { providers } = props;
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<String | undefined>("");
  const [showForget, setShowForget] = useState(false);


  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      location.href = "/";
    }
  }, [status]);

  const signin = async (provider: any) => {
    setLoading(true);
    const result = await signIn(provider, {
      callbackUrl: '/',
      redirect: false,
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    })
    const error = result?.error;
    setErrorMsg(error);
    setLoading(false);
  }

  const renderButton = (id: string) => {
    switch (id) {
      case 'credentials':
        return <CredentialButton signin={() => signin(id)} />
      default:
        break;
    }
  }

  if (status === "authenticated") {
    return <></>
  }

  return (
    <>
      <div className={style.signin_page} >
        <div className={style.left_container}>
          <div className={style.image_container}>
            <Image className={style.bg_image} src={BgImage} width="400" height="400" alt="signin background" />
            <div className={style.title}>
              Web Template CMS
            </div>
          </div>
        </div>
        <div
          className={style.right_container}
        >
          <div className={style.signin_container}>
            <div className={style.credential_container}>
              {errorMsg && <div className={style.err_msg}>{errorMsg}</div>}
              <input ref={emailRef} className={style.input} placeholder="email" type="text" />
              <input ref={passwordRef} className={style.input} placeholder="password" type="password" />
              <div className={style.register_container}>
                <Link 
                  href="#"
                  className={style.register_link}
                  onClick={() => {
                    setShowForget(true);
                  }}
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
            <div className={style.container}>
              {Object.values(providers).map((provider) => (
                <div className={style.signin_button_container} key={provider.name}>
                  {renderButton(provider.id)}
                </div>
              ))}
            </div>
          </div>
          <div className={`${style.recovery_password_container} ${showForget ? 'translate-y-[0]' : 'translate-y-[1000px]' }`}>
            <RecoveryPassword sentCallback={() => {
              setShowForget(false);
            }} />
          </div>
        </div>
      </div>
      {loading && <FullPageLoader show={true} bgColor="white" />}
    </>
  );
}

export default SigninPage
