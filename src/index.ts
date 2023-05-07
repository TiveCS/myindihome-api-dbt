import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Express } from "express";
import { UserRepository } from "./domains/repository/UserRepository.js";
import { UserRepositoryPrisma } from "./infrastructures/repository/UserRepositoryPrisma.js";
import { AuthController } from "./http/auth/AuthController.js";
import { AuthService } from "./http/auth/AuthService.js";
import { RegisterUserUseCase } from "./usecases/auth/RegisterUserUseCase.js";
import { LoginUserUseCase } from "./usecases/auth/LoginUserUseCase.js";
import { TokenManager } from "./security/TokenManager.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const tokenManager: TokenManager = new TokenManager({
  accessKeySecret: process.env.JWT_ACCESS_SECRET!,
});

// Repository
const userRepository: UserRepository = new UserRepositoryPrisma();

// Use cases
const registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase(
  userRepository
);
const loginUserUseCase: LoginUserUseCase = new LoginUserUseCase(
  userRepository,
  tokenManager
);

// Service
const authService: AuthService = new AuthService(
  registerUserUseCase,
  loginUserUseCase
);

// Controller
new AuthController(app, authService);

app.listen(port, () => {
  console.log(`[server] Server running on port ${port}`);
});
