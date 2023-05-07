import { NewInboxType } from "../../domains/schemas/NewInboxSchema.js";
import { GetInboxUseCase } from "../../usecases/inbox/GetInboxUseCase.js";
import { NewInboxUseCase } from "../../usecases/inbox/NewInboxUseCase.js";

export class InboxService {
  private readonly newInboxUseCase: NewInboxUseCase;
  private readonly getInboxUseCase: GetInboxUseCase;

  constructor(
    newInboxUseCase: NewInboxUseCase,
    getInboxUseCase: GetInboxUseCase
  ) {
    this.newInboxUseCase = newInboxUseCase;
    this.getInboxUseCase = getInboxUseCase;
  }

  async create(newInbox: NewInboxType) {
    const result = await this.newInboxUseCase.execute(newInbox);

    return result;
  }

  async getInbox(userId: string) {
    return await this.getInboxUseCase.execute({ userId });
  }
}
