import { InboxRepository } from "../../domains/repository/InboxRepository.js";
import { NewInboxType } from "../../domains/schemas/NewInboxSchema.js";

export class NewInboxUseCase {
  private readonly inboxRepository: InboxRepository;

  constructor(inboxRepository: InboxRepository) {
    this.inboxRepository = inboxRepository;
  }

  async execute(newInbox: NewInboxType) {
    const result = await this.inboxRepository.create(newInbox);

    return result;
  }
}
