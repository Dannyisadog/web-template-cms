import { GetServerSideProps } from "next";
import ResetPassword from "components/ResetPassword";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResetPasswordProps } from "../../types/signin/PasswordProps";

const ResetPasswordPage = (props: ResetPasswordProps) => {
  const { email } = props;

  return <ResetPassword email={email} />
}

export default ResetPasswordPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { token } = query;

  try {
    if (!token) {
      throw new Error("toke should not be empty");
    }

    const KEY = process.env.NEXTAUTH_SECRET || '';

    const { email } = jwt.verify(token.toString(), KEY) as JwtPayload;

    if (!email) {
      throw new Error("email not exist");
    }

    return {
      props: {
        email
      }
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/recovery/password",
      },
      props:{},
    };
  }
}