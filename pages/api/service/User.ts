import { prisma } from "db";
import User from "types/next-auth";

export const findUserByEmail = async (email: string | undefined): User => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return null;
  }

  return user;
}