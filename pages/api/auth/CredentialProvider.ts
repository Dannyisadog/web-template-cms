import CredentialsProvider from "next-auth/providers/credentials";
import { isEmail } from "utils/util";
import { findUserByEmail } from "../service/User";
import bcrypt from "bcryptjs";
import Session from "types/next-auth";

export default CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "email",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    email: { label: "email", type: "text", placeholder: "email" },
    password: { label: "password", type: "password", placeholder: "password" }
  },
  async authorize(credentials, req) {
    const email = credentials?.email;
    const password = credentials?.password;

    if (!password || !isEmail(email)) {
      throw new Error("email or password incorrect")
    }

    const existUser = await findUserByEmail(email);

    if (!existUser) {
      throw new Error("email or password incorrect")
    }
    
    const { password: userPassword } = existUser;

    if (!bcrypt.compareSync(password, userPassword)) {
      throw new Error("email or password incorrect")
    }
    
    return existUser;
  }
})

'(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => Promise<...>'
'(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => Awaitable<...>'