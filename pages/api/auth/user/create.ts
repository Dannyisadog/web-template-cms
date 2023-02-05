import { NextApiRequest } from "next";
import { SigninUserProps } from "types/nextauth/SigninCallbackProps";
import { prisma } from "db";
import { isEmail } from "utils/util";
import BaseApiHandler from "pages/api/base/baseApiHandler";
import { isPasswordValid } from "pages/api/service/password";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "pages/api/service/User";

export const create = async (req: NextApiRequest, apiHandler: BaseApiHandler) => {
  const body = JSON.parse(req.body);

  const {
    username,
    email: userEmail,
    password,
    passwordConfirm
  } = body;

  if (!username) {
    throw new Error("username should not be empty");
  }

  if (!isEmail(userEmail)) {
    throw new Error("email is invalid");
  }

  const existUser = await findUserByEmail(userEmail);

  if (existUser) {
    apiHandler.send400("user existed");
  }

  if (password !== passwordConfirm) {
    throw new Error("password should be the same");
  }

  isPasswordValid(password);

  const passwordHash = bcrypt.hashSync(password, 10);

  const userData = {
    name: username,
    password: passwordHash,
    email: userEmail,
    image: "",
    active: 1
  };

  try {
    const newUser = await prisma.user.create({
      data: userData,
    })
  } catch(e) {
    console.log(e);
    throw new Error("create user fail...");
  }

  const result = {
    msg: "create user successfully"
  }

  return result;
}