import type { NextApiRequest, NextApiResponse } from "next"
import BaseApiHandler from "./base/baseApiHandler"

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  const apiHandler = new BaseApiHandler(req, res);
  apiHandler.json({
    "status": "ok"
  })
}
