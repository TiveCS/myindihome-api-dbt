import { Inbox } from "@prisma/client";
import { InboxRepository } from "../../domains/repository/InboxRepository.js";

export class GetInboxUseCase {
  private readonly inboxRepository: InboxRepository;

  constructor(inboxRepository: InboxRepository) {
    this.inboxRepository = inboxRepository;
  }

  async execute({ userId }: { userId: string }): Promise<Inbox[]> {
    return await this.inboxRepository.findManyForUser(userId);
  }
}
