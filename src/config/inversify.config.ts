// src/container.ts

import { Container } from "inversify";
import "reflect-metadata";
import { AuthRepository } from "src/auth/repository/auth.repository";
import { AuthService } from "src/auth/services/auth.service";
import { PrismaService } from "src/libs/prisma";
import { UsersRepository } from "src/users/repository/users.repository";
import { UsersService } from "src/users/services/users.services";
import { ChatService } from "src/chat/services/chat.services";
import { ChatRepository } from "src/chat/repository/chat.repository";

const container = new Container();
// Registrar PrismaService como singleton
container.bind(PrismaService).toSelf().inSingletonScope();

// Registrar UsersRepository
container.bind(UsersRepository).toSelf();

// Registrar UsersService
container.bind(UsersService).toSelf();
// Registrar AuthService
container.bind(AuthService).toSelf();
// Registrar RepositoryService
container.bind(AuthRepository).toSelf();

//Registrar // Registrar ChatRepository
container.bind(ChatRepository).toSelf()

// Registrar ChatService
container.bind(ChatService).toSelf()

export { container };

