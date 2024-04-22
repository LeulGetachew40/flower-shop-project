import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // enforce decoupling here
import { DatabaseService } from './../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.databaseService;
    //  `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
