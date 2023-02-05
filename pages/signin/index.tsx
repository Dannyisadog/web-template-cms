import Signin from "components/Signin/index"
import { getProviders } from "next-auth/react";
import SigninProps from "types/signin/SigninProps"

const SigninPage = (props: SigninProps) => {
  const { providers } = props;

  return (
    <Signin providers={providers} />
  );
}

export default SigninPage;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}