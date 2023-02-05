import { prisma } from "db";
import { NextApiRequest } from "next";
import BaseApiHandler from "pages/api/base/baseApiHandler";

export const deleteUser = async (req: NextApiRequest, apiHandler: BaseApiHandler) => {
  const body = JSON.parse(req.body);
  const { email } = body;
  const existUser = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (!existUser) {
    apiHandler.send400("user not exist");
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      active: 0
    },
  });

  const result = {
    msg: `delete ${email} successfully`
  };

  return result;
}