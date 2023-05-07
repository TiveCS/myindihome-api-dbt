import { ExtractJwt, Strategy, VerifyCallback } from "passport-jwt";

export class JwtStrategy extends Strategy {
  constructor(verify: VerifyCallback) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_ACCESS_SECRET,
      },
      verify
    );
  }
}
