import { Subscription } from "@prisma/client";
import { NewSubscriptionSchema, NewSubscriptionType } from "../schemas/NewSubscriptionSchema.js";

export interface SubscriptionRepository {
//   create(data: Subscription): Promise<Subscription>;
  create(newSubscriber: NewSubscriptionType): Promise<{ id: string }>;
  findById(id: string): Promise<Subscription | null>;
  findAll(): Promise<Subscription[]>;
  update(id: string, data: Subscription): Promise<Subscription>;
  delete(id: string): Promise<boolean>;
}

