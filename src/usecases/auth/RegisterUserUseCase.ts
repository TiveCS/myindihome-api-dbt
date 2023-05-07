import { UserRepository } from "../../domains/repository/UserRepository.js";
import { NewUserType } from "../../domains/schemas/NewUserSchema.js";
import * as argon2 from "argon2";

export class RegisterUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(newUser: NewUserType) {
    const hashedPassword = await argon2.hash(newUser.password);

    const user = await this.userRepository.create({
      email: newUser.email,
      password: hashedPassword,
      fullName: newUser.fullName,
      phoneNumber: newUser.phoneNumber,
    });

    return user;
  }
}
