import { NewInboxType } from "../../domains/schemas/NewInboxSchema.js";
import { NewInboxUseCase } from "../../usecases/inbox/NewInboxUseCase.js";

export class InboxService {
  private readonly NewInboxUseCase: NewInboxUseCase;

  constructor(NewInboxUseCase: NewInboxUseCase) {
    this.NewInboxUseCase = NewInboxUseCase;
  }

  async create(newInbox: NewInboxType) {
    const result = await this.NewInboxUseCase.execute(newInbox);

    return result;
  }
}
