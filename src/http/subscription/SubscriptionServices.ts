import { Subscription } from "@prisma/client";
import { SubscriptionRepository } from "../../domains/repository/SubscriptionRepository.js";
import { NewSubscriptionType } from "../../domains/schemas/NewSubscriptionSchema.js";
import { UpdateSubscriptionType  } from "../../domains/schemas/UpdateSubscriptionSchema.js";

// referensi contoh
// import { NewInboxType } from "../../domains/schemas/NewInboxSchema.js";
// import { GetInboxUseCase } from "../../usecases/inbox/GetInboxUseCase.js";
// import { NewInboxUseCase } from "../../usecases/inbox/NewInboxUseCase.js";

import { Express, Request, Response } from "express";
import Controller from "../../domains/http/Controller.js";
import { z } from "zod";


export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async create(data: NewSubscriptionType): Promise<Subscription> {
    return this.subscriptionRepository.create(data);
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findById(id);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.findAll();
  }

  async update(id: string, data: UpdateSubscriptionType): Promise<Subscription> {
    return this.subscriptionRepository.update(id, data);
  }

  async delete(id: string): Promise<Subscription> {
    return this.subscriptionRepository.delete(id);
  }
}
