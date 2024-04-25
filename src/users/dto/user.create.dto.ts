import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { USERTYPE } from '@prisma/client';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsEnum(USERTYPE)
  userType: 'CUSTOMER' | 'ADMIN' | 'CLERK';
}
