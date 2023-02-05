import { NextApiRequest, NextApiResponse } from 'next';
import { getUrl, isEmail } from 'utils/util';
import { findUserByEmail } from '../service/User';
import jwt from "jsonwebtoken";
import BaseApiHandler from '../base/baseApiHandler';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import Mailer from '../base/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiHandler = new BaseApiHandler(req, res);
  
  try {
    const body = JSON.parse(req.body)

    if (req.method !== 'POST') {
      throw new Error("post method allowed");
    }

    const { email } = body;

    if (!isEmail(email)) {
      throw new Error("email type incorrect");
    }

    const existUser = await findUserByEmail(email);

    if (!existUser) {
      throw new Error("user not existed");
    }

    const KEY = process.env.NEXTAUTH_SECRET || '';

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email
    }, KEY);

    const templateDirectory = path.resolve(process.cwd(), "template");
    const emailTemplate = readFileSync(path.join(templateDirectory, "recoveryPassword.hbs"), "utf8");

    const template = Handlebars.compile(emailTemplate);

    const { name } = existUser;
    const link = `${getUrl()}/reset/password?token=${token}`;

    const html = template({ name, link });
    const mailer = new Mailer();

    mailer.send({
      template: html,
      subject: 'Reset Password',
      to: email
    });

    apiHandler.json({
      "msg": "reset password link sent successfully"
    });

  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      apiHandler.send400(e.message);
    } else {
      apiHandler.send500();
    }
  }
}