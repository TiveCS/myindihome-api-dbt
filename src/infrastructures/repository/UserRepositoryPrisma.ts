import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../../domains/repository/UserRepository.js";
import { NewUserType } from "../../domains/schemas/NewUserSchema.js";
import prisma from "../database/prismaClient.js";

export class UserRepositoryPrisma implements UserRepository {
  async create(newUser: NewUserType): Promise<{ id: string }> {
    try {
      const result = await prisma.user.create({
        data: {
          fullName: newUser.fullName,
          email: newUser.email,
          password: newUser.password,
          phoneNumber: newUser.phoneNumber,
        },
        select: {
          id: true,
        },
      });

      return { id: result.id };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("User is already exists");
        }
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
