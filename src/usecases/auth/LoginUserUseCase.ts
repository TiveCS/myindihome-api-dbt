import { UserRepository } from "../../domains/repository/UserRepository.js";
import { LoginUserType } from "../../domains/schemas/LoginUserSchema.js";
import * as argon2 from "argon2";
import { TokenManager } from "../../security/TokenManager.js";

export class LoginUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly tokenManager: TokenManager;

  constructor(userRepository: UserRepository, tokenManager: TokenManager) {
    this.userRepository = userRepository;
    this.tokenManager = tokenManager;
  }

  async execute(payload: LoginUserType) {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await argon2.verify(
      user.password,
      payload.password
    );

    if (!isPasswordMatch) {
      throw new Error("Password not match");
    }

    // TODO: Generate JWT token
    const token = this.tokenManager.generateToken({
      sub: user.id,
    });

    return token;
  }
}
