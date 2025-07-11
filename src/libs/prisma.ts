// src/prisma/prisma.service.ts
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect() {
    await this.client.$connect();
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
