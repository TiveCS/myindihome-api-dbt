import { Subscription } from '@prisma/client';
import { SubscriptionRepository } from '../../domains/repository/SubscriptionRepository.js';

export class GetSubscriptionUseCase {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async execute(id: string): Promise<Subscription | null> {
    const subscription = await this.subscriptionRepository.findById(id);
    return subscription;
  }

  async executeAll(): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.findAll();
    return subscriptions;
  }
}
