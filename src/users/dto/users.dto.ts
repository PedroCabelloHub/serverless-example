import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

  /*   @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string; */
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

}


