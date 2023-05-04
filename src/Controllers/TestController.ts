import { Response, Request } from "express";

export class TestController {
  async test(req: Request, res: Response) {
    res.json({ message: "hello world" });
  }
}
