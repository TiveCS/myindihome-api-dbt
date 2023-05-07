import { UserRepository } from "../../domains/repository/UserRepository.js";
import { LoginUserType } from "../../domains/schemas/LoginUserSchema.js";
import { NewUserType } from "../../domains/schemas/NewUserSchema.js";
import { LoginUserUseCase } from "../../usecases/auth/LoginUserUseCase.js";
import { RegisterUserUseCase } from "../../usecases/auth/RegisterUserUseCase.js";

export class AuthService {
  private readonly registerUserUseCase: RegisterUserUseCase;
  private readonly loginUserUseCase: LoginUserUseCase;

  constructor(
    registerUserUseCase: RegisterUserUseCase,
    loginUserUseCase: LoginUserUseCase
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  async register(newUser: NewUserType) {
    const user = await this.registerUserUseCase.execute(newUser);

    return user;
  }

  async login(credentials: LoginUserType) {
    const token = await this.loginUserUseCase.execute(credentials);

    return token;
  }
}
