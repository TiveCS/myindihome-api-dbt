import { Subscription } from '@prisma/client';
import { SubscriptionRepository } from '../../domains/repository/SubscriptionRepository.js';

export class UpdateSubscriptionUseCase {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async execute(id: string, data: Partial<Subscription>): Promise<Subscription | null> {
    // Casting Partial<Subscription> menjadi Subscription
    const subscriptionData = data as Subscription;
    const subscription = await this.subscriptionRepository.update(id, subscriptionData);
    return subscription;
  }
}
