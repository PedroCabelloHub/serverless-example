// src/container.ts

import "reflect-metadata"
import { Container } from "inversify";
import { UsersRepository } from "src/users/repository/users.repository";
import { UsersService } from "src/users/services/users.services";
import { PrismaService } from "src/libs/prisma";

const container = new Container();
// Registrar PrismaService como singleton
container.bind(PrismaService).toSelf().inSingletonScope();

// Registrar UsersRepository
container.bind(UsersRepository).toSelf();

// Registrar UsersService
container.bind(UsersService).toSelf();
export  {container};
