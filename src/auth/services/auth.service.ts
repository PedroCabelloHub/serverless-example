import { ROLES } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository";


@injectable()
export class AuthService {
constructor(@inject(AuthRepository) private authRepository: AuthRepository) {}


  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findByGmail(email)
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return null;

    return user;
  }

  generateToken(userId: number, role: ROLES) {
    return jwt.sign({ sub: userId, role: role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }


}
