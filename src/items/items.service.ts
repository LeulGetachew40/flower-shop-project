import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // for the DTOs

import { DatabaseService } from './../database/database.service';
import { ApiError } from 'src/common/apiError';

// or they can be instantiated in the constructor function
@Injectable() // this tells nest js that we can inject this class as a dependency  into other classes
export class ItemsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createItemDto: Prisma.ItemsCreateInput) {
    return await this.databaseService.items.create({ data: createItemDto });
  }

  async findAll(page?: number, limit?: number) {
    if (!page || !limit) {
      return await this.databaseService.items.findMany();
    }
    // use cursor and take
    const skip: number = (page - 1) * limit;
    return await this.databaseService.items.findMany({ skip, take: limit });
  }

  async findOne(id: string) {
    const item = await this.databaseService.items.findUnique({
      where: { itemID: id },
    });
    if (!item) {
      throw new ApiError('Item not Found', HttpStatus.NOT_FOUND);
    } else {
      return item;
    }
  }

  async update(id: string, updateItemDto: Prisma.ItemsUpdateInput) {
    if (updateItemDto.itemID) {
      delete updateItemDto.itemID;
    }
    return await this.databaseService.items.update({
      where: { itemID: id },
      data: updateItemDto, // add an interceptor here to fix the id issue
    });
  }

  async remove(id: string) {
    return await this.databaseService.items.delete({ where: { itemID: id } });
  }

  async viewCart() {
    return 'this is your cart';
  }
}
