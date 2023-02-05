import { prisma } from "db";
import { NextApiRequest } from "next";
import BaseApiHandler from "pages/api/base/baseApiHandler";

export const updateUser = async (req: NextApiRequest, apiHandler: BaseApiHandler) => {
  const body = JSON.parse(req.body);
  const {
    username,
    email,
    image
  } = body;

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
      email
    },
    data: {
      name: username,
      image
    },
  });

  const result = {
    msg: `update ${email} successfully`
  };

  return result;
}