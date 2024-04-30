import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // enforce decoupling here
import { DatabaseService } from './../database/database.service';
import { ApiError } from 'src/common/apiError';

// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';
// import { CreateUserDto } from './dto/user.create.dto';
// import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  // try to immitate handlerFactory here by instantiating the factory in the cinstructor
  async create(createUserDto: Prisma.UserCreateInput) {
    // const dto = plainToClass(CreateUserDto, createUserDto); // creates an object from the specified class
    // const errors = await validate(dto); // validate checks if the newly cerated object aligns with the class

    // if (errors.length > 0) {
    //   return errors;
    // }

    // determine whether the user already exists or not using their email before saving the user
    // don't accept userID here but rather generate our own
    try {
      return await this.databaseService.user.create({ data: createUserDto });
    } catch (error) {
      throw new ApiError('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    // implement query object filtering here
    return await this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { userID: id },
    });
    if (!user) {
      throw new ApiError('User Not Found', HttpStatus.BAD_REQUEST);
    } else {
      return user;
    }
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    // fix missing records issue here
    return this.databaseService.user.update({
      where: { userID: id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.databaseService.user.delete({ where: { userID: id } });
  }
}
