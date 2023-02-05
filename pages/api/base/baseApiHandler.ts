import { NextApiRequest, NextApiResponse } from "next";

class BaseApiHandler {
  req: NextApiRequest;
  res: NextApiResponse;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  // success response
  json(data: Object) {
    return this.res.status(200).send(data);
  }

  // 400 response
  send400(msg = "Bad Request") {
    return this.res.status(400).send({
      msg
    })
  }

  // 401 response
  send401(msg = "Authorization Required") {
    return this.res.status(401).send({
      msg
    })
  }

  // 403 response
  send403(msg = "Not Allowed To Access") {
    return this.res.status(403).send({
      msg
    })
  }

  // 404 response
  send404(msg = "Not Found") {
    return this.res.status(404).send({
      msg
    })
  }

  // 405 response
  send405(msg = "Method not Allowed") {
    return this.res.status(405).send({
      msg
    })
  }

  // 500 response
  send500(msg = "System Crash") {
    return this.res.status(500).send({
      msg
    })
  }
}

export default BaseApiHandler;