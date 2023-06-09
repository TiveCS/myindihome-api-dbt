import { Express, Request, Response } from "express";
import { z } from "zod";
import {
  LoginUserSchema,
  LoginUserType,
} from "../../domains/schemas/LoginUserSchema.js";
import {
  NewUserSchema,
  NewUserType,
} from "../../domains/schemas/NewUserSchema.js";
import { AuthService } from "./AuthService.js";
import requireAuth from "../../middleware/requireAuth.js";
import Controller from "../../domains/http/Controller.js";

export class AuthController extends Controller {
  private readonly authService: AuthService;

  constructor(app: Express, authService: AuthService) {
    super(app);

    this.authService = authService;
  }

  registerRoutes(app: Express): void {
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
            message: error.issues.map(
              (issue) => `${issue.path}: ${issue.message}`
            ),
          });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });

    app.post("/auth/login", async (req: Request, res: Response) => {
      const payload = req.body;

      try {
        const credentials: LoginUserType = LoginUserSchema.parse(payload);

        const token = await this.authService.login(credentials);

        res.status(200).json({ message: "Successfully login", data: token });
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            message: error.issues.map(
              (issue) => `${issue.path}: ${issue.message}`
            ),
          });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });

    app.get("/auth/me", requireAuth, async (req: Request, res: Response) => {
      res.status(200).json({
        message: "ok",
      });
    });
  }
}
