import { ROLES } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password:string

    @IsOptional()
    @IsEnum(ROLES)
    role?: ROLES
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

}


