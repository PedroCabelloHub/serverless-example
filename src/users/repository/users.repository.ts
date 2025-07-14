import { ROLES } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaService } from "src/libs/prisma";

@injectable()
export class UsersRepository {
  constructor(@inject(PrismaService) private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.client.user.findMany();
  }

  async save(name: string,password:string, email:string, role?:ROLES) {
    return await this.prismaService.client.user.create({
      data: { name,passwordHash:password, email , role},
    });
  }

  async findById(id: number) {
    return await this.prismaService.client.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, name: string) {
    return await this.prismaService.client.user.update({
      where: { id },
      data: { name:name },
    });
  }

  async delete(id: number) {
    return await this.prismaService.client.user.delete({
      where: { id },
    });
  }
}
