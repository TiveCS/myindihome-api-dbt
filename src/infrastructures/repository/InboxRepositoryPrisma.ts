import { Inbox } from "@prisma/client";
import { InboxRepository } from "./../../domains/repository/InboxRepository.js";
import { NewInboxType } from "../../domains/schemas/NewInboxSchema.js";
import prisma from "../database/prismaClient.js";

class InboxRepositoryPrisma implements InboxRepository {
  async create(newInbox: NewInboxType): Promise<{ id: string }> {
    const result = await prisma.inbox.create({
      data: {
        message: newInbox.message,
        userId: newInbox.receiverId,
      },
      select: {
        id: true,
      },
    });

    return { id: result.id };
  }

  async findManyForUser(userId: string): Promise<Inbox[]> {
    const inbox = await prisma.inbox.findMany({
      where: {
        userId,
      },
    });

    return inbox;
  }
}
