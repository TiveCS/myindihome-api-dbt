import { Express, Request, Response } from "express";
// import express, { Request, Response } from "express";
import { SubscriptionService } from "../subscription/SubscriptionServices.js";
import { NewSubscriptionType } from "../../domains/schemas/NewSubscriptionSchema.js";
import { UpdateSubscriptionType  } from "../../domains/schemas/UpdateSubscriptionSchema.js";
import Controller from "../../domains/http/Controller.js";
import { z } from "zod";


export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  async index(_: Request, res: Response) {
    const subscriptions = await this.subscriptionService.findAll();
    return res.json(subscriptions);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const subscription = await this.subscriptionService.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    return res.json(subscription);
  }

  async store(req: Request, res: Response) {
    const data: NewSubscriptionType = req.body;
    const subscription = await this.subscriptionService.create(data);
    return res.status(201).json(subscription);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateSubscriptionType = req.body;
    const subscription = await this.subscriptionService.update(id, data);
    return res.json(subscription);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await this.subscriptionService.delete(id);
    return res.sendStatus(204);
  }
}

export const subscriptionController = new SubscriptionController(new SubscriptionService(new SubscriptionRepositoryPrisma()));
