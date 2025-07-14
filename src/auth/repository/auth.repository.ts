import { inject, injectable } from "inversify";
import { PrismaService } from "src/libs/prisma";

@injectable()
export class AuthRepository {
  constructor(@inject(PrismaService) private prismaService: PrismaService) {}

  async findByGmail(email: string) {
    return await this.prismaService.client.user.findUnique({
      where: { email },
    });
  }
}
