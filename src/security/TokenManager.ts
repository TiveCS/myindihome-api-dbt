import { JwtPayloadType } from "../domains/schemas/JwtPayloadSchema.js";
import jwt from "jsonwebtoken";

export class TokenManager {
  private readonly accessKeySecret: string;

  constructor({ accessKeySecret }: { accessKeySecret: string }) {
    this.accessKeySecret = accessKeySecret;
  }

  generateToken(payload: JwtPayloadType) {
    const access_token = jwt.sign(payload, this.accessKeySecret);

    return { access_token };
  }
}
