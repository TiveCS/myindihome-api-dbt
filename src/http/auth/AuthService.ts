import { UserRepository } from "../../domains/repository/UserRepository.js";
import { NewUserType } from "../../domains/schemas/NewUserSchema.js";
import { RegisterUserUseCase } from "../../usecases/auth/RegisterUserUseCase.js";

export class AuthService {
  private readonly registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  async register(newUser: NewUserType) {
    const user = await this.registerUserUseCase.execute(newUser);

    return user;
  }

  async login() {}
}
