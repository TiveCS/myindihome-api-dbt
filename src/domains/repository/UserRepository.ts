import { User } from "@prisma/client";
import { NewUserType } from "../schemas/NewUserSchema.js";

export interface UserRepository {
  create(newUser: NewUserType): Promise<{ id: string }>;

  findByEmail(email: string): Promise<User>;
}
