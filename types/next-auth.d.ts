import NextAuth from "next-auth"
import { User as UserModel } from '@prisma/client';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends UserModel {
    password: string;
  }
}

export default User;