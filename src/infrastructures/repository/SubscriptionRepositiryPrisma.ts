import { Prisma, Subscription } from "@prisma/client";
import { SubscriptionRepository } from "../../domains/repository/SubscriptionRepository.js";
import { NewSubscriptionType  } from "../../domains/schemas/NewSubscriptionSchema.js";
import { UpdateSubscriptionType  } from "../../domains/schemas/UpdateSubscriptionSchema.js";
import prisma from "../database/prismaClient.js";


export class SubscriptionRepositoryPrisma implements SubscriptionRepository {
  async create(data: NewSubscriptionType): Promise<Subscription> {
    const subscription = await prisma.subscription.create({
      data,
    });
    return subscription;
  }

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });
    return subscription;
  }

  async findAll(): Promise<Subscription[]> {
    const subscriptions = await prisma.subscription.findMany();
    return subscriptions;
  }

  async update(id: string, data: UpdateSubscriptionType): Promise<Subscription> {
    const subscription = await prisma.subscription.update({
      where: { id },
      data,
    });
    return subscription;
  }

  async delete(id: string): Promise<Subscription> {
    const subscription = await prisma.subscription.delete({
      where: { id },
    });
    return subscription;
  }
}