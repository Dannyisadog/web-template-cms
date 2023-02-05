import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import BaseApiHandler from "../base/baseApiHandler";
import { create } from "./user/create";
import { deleteUser } from "./user/delete";
import { getAllUsers } from "./user/list";
import { updateUser } from "./user/update";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const apiHandler = new BaseApiHandler(req, res);
  const token = await getToken({req});

  if (!token) {
    apiHandler.send401();
  }

  try {
    switch (method) {
      case "GET":
        const data = await getAllUsers(req, apiHandler);
        apiHandler.json(data);
        break;
      case "POST":
        const createUserResult = await create(req, apiHandler);
        apiHandler.json(createUserResult);
        break;
      case "PUT":
        const updateUserResult = await updateUser(req, apiHandler);
        apiHandler.json(updateUserResult);
        break;
      case "DELETE":
        const deleteUserResult = await deleteUser(req, apiHandler);
        apiHandler.json(deleteUserResult);
        break;
      default:
        apiHandler.send401();
        break;
    }
  } catch (e) {
    console.log(e);
    apiHandler.send400();
  }
}