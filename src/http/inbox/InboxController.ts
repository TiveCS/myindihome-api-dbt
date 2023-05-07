import { z } from "zod";
import Controller from "../../domains/http/Controller.js";
import { InboxService } from "./InboxService.js";
import { Express } from "express";
import {
  NewInboxSchema,
  NewInboxType,
} from "../../domains/schemas/NewInboxSchema.js";
import requireAuth from "../../middleware/requireAuth.js";
import { User } from "@prisma/client";

export class InboxController extends Controller {
  private readonly inboxService: InboxService;

  constructor(app: Express, inboxService: InboxService) {
    super(app);

    this.inboxService = inboxService;
  }

  registerRoutes(app: Express): void {
    app.post("/inbox", async (req, res) => {
      const payload = req.body;

      try {
        const newInbox: NewInboxType = NewInboxSchema.parse(payload);

        const inbox = await this.inboxService.create(newInbox);

        res
          .status(201)
          .json({ message: "Successfully create inbox", data: inbox });
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

    app.get("/inbox", requireAuth, async (req, res) => {
      const user: User = req.user as User;

      const inbox = await this.inboxService.getInbox(user.id);

      res.status(200).json({ message: "Successfully get inbox", data: inbox });
    });
  }
}
