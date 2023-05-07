import passport from "passport";
import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: unknown, info: unknown) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default requireAuth;
