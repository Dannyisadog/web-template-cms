import { signOut } from "next-auth/react";
import { useEffect } from "react";

const SignoutPage = () => {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);
  return null;
}

export default SignoutPage;