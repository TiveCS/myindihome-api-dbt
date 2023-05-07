import { Inbox } from "@prisma/client";
import { NewInboxType } from "../schemas/NewInboxSchema.js";

export interface InboxRepository {
  create(newInbox: NewInboxType): Promise<{ id: string }>;

  findManyForUser(userId: string): Promise<Inbox[]>;
}
