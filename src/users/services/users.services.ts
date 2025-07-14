import { ROLES } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { UsersRepository } from "src/users/repository/users.repository";

@injectable()
export class UsersService {
  constructor(@inject(UsersRepository) private usersRepository: UsersRepository) {}

  async getUsers() {
    // Aquí podrías añadir validaciones o lógica extra
    return await this.usersRepository.findAll();
  }

  async createUser(name: string,password:string,email:string,role?:ROLES) {
    // Validaciones, reglas de negocio
    const passwordHash = await bcrypt.hash(password,10)
    return await this.usersRepository.save(name,passwordHash,email,role);
  }

  async getUserById(id: number) {
    // Validaciones, reglas de negocio
    return await this.usersRepository.findById(id);
  }

  async updateUser(id: number, name: string) {
    // Validaciones, reglas de negocio
    return await this.usersRepository.update(id, name);
  }

  async deleteUser(id: number) {
    // Validaciones, reglas de negocio
    return await this.usersRepository.delete(id);
  }
}
