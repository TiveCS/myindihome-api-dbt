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
import passport from "passport";
import { JwtStrategy } from "./security/strategy/JwtStrategy.js";
import { JwtPayloadType } from "./domains/schemas/JwtPayloadSchema.js";
import prisma from "./infrastructures/database/prismaClient.js";
import { InboxRepository } from "./domains/repository/InboxRepository.js";
import { InboxRepositoryPrisma } from "./infrastructures/repository/InboxRepositoryPrisma.js";
import { NewInboxUseCase } from "./usecases/inbox/NewInboxUseCase.js";
import { InboxService } from "./http/inbox/InboxService.js";
import { InboxController } from "./http/inbox/InboxController.js";
import { GetInboxUseCase } from "./usecases/inbox/GetInboxUseCase.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(
  new JwtStrategy(async (payload: JwtPayloadType | undefined | null, done) => {
    if (!payload) {
      done(null, false);
      return;
    }

    const { sub } = payload;

    const user = await prisma.user.findUnique({ where: { id: sub } });

    if (!user) {
      done(null, false);
      return;
    }

    done(null, user);
  })
);

const tokenManager: TokenManager = new TokenManager({
  accessKeySecret: process.env.JWT_ACCESS_SECRET!,
});

// Repository
const userRepository: UserRepository = new UserRepositoryPrisma();
const inboxRepository: InboxRepository = new InboxRepositoryPrisma();

// Use cases
const registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase(
  userRepository
);
const loginUserUseCase: LoginUserUseCase = new LoginUserUseCase(
  userRepository,
  tokenManager
);
const newInboxUseCase: NewInboxUseCase = new NewInboxUseCase(inboxRepository);
const getInboxUseCase: GetInboxUseCase = new GetInboxUseCase(inboxRepository);

// Service
const authService: AuthService = new AuthService(
  registerUserUseCase,
  loginUserUseCase
);
const inboxService: InboxService = new InboxService(
  newInboxUseCase,
  getInboxUseCase
);

// Controller
new AuthController(app, authService);
new InboxController(app, inboxService);

app.listen(port, () => {
  console.log(`[server] Server running on port ${port}`);
});
