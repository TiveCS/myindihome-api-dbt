import { Express, Request, Response } from "express";
import { AuthService } from "./AuthService.js";
import {
  NewUserSchema,
  NewUserType,
} from "../../domains/schemas/NewUserSchema.js";
import { z } from "zod";

export class AuthController {
  private readonly authService: AuthService;

  constructor(app: Express, authService: AuthService) {
    this.authService = authService;

    this.registerRoutes(app);
  }

  registerRoutes(app: Express) {
    app.post("/auth/register", async (req: Request, res: Response) => {
      const payload = req.body;

      try {
        const newUser: NewUserType = NewUserSchema.parse(payload);

        const user = await this.authService.register(newUser);

        res
          .status(201)
          .json({ message: "Successfully register user", data: user });
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            message: error.issues.map((i) => `${i.path}: ${i.message}`),
          });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });
  }
}
