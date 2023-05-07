import { SubscriptionRepository } from '../../domains/repository/SubscriptionRepository.js';

export class DeleteSubscriptionUseCase {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async execute(id: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    await this.subscriptionRepository.delete(id);
  }
}
