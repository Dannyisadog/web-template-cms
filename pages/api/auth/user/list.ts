import { prisma } from "db";
import { NextApiRequest } from "next";
import BaseApiHandler from "pages/api/base/baseApiHandler";

export const getAllUsers = async (req: NextApiRequest, apiHandler: BaseApiHandler) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const userCount = await prisma.user.count();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true
    },
    skip: (page - 1) * perPage,
    take: perPage
  });

  const data = {
    data: {
      totalCount: userCount,
      users
    }
  };

  return data;
}