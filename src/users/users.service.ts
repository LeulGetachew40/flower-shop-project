import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // enforce decoupling here
import { DatabaseService } from './../database/database.service';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/user.create.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const dto = plainToClass(CreateUserDto, createUserDto); // creates an object from the specified class
    const errors = await validate(dto); // checks if the newly cerated object aligns with the class

    if (errors.length > 0) {
      return errors;
    }

    // determine whether the user already exists or not using their email before saving the user

    return await this.databaseService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
