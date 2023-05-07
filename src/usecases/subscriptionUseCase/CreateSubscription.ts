import { PrismaClient, Subscription } from '@prisma/client';
import { SubscriptionRepository } from '../../domains/repository/SubscriptionRepository.js';

export class CreateSubscriptionUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: Omit<Subscription, 'id'>): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({ data });
    return subscription;
  }
}
