import type { NextApiRequest, NextApiResponse } from "next";
import { isPasswordValid } from "../service/password";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../service/User";
import { prisma } from "db";
import BaseApiHandler from "../base/baseApiHandler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiHandler = new BaseApiHandler(req, res);
  try {
    if (req.method !== 'POST') {
      apiHandler.send405();
    }

    const body = JSON.parse(req.body)

    const {
      email,
      newPassword,
      newPasswordConfirm
    } = body;

    const existUser = findUserByEmail(email);

    if (!existUser) {
      throw new Error("user not exist");
    }

    if (newPassword !== newPasswordConfirm) {
      throw new Error("password should be the same");
    }

    isPasswordValid(newPassword);

    const passwordHash = bcrypt.hashSync(newPassword, 10);

    await prisma.user.update({
      where: {
        email
      },
      data: {
        password: passwordHash
      },
    })

    apiHandler.json({
      "msg": "reset password successfully"
    });

  } catch(e) {
    if (e instanceof Error) {
      apiHandler.send400(e.message);
    } else {
      apiHandler.send500();
    }
  }
}