import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // for the DTOs

import { DatabaseService } from './../database/database.service';

// or they can be instantiated in the constructor function
@Injectable() // this tells nest js that we can inject this class as a dependency  into other classes
export class ItemsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createItemDto: Prisma.ItemsCreateInput) {
    return await this.databaseService.items.create({ data: createItemDto });
  }

  async findAll() {
    return await this.databaseService.items.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.items.findUnique({
      where: { itemID: id },
    });
  }

  async update(id: string, updateItemDto: Prisma.ItemsUpdateInput) {
    return await this.databaseService.items.update({
      where: { itemID: id },
      data: updateItemDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.items.delete({ where: { itemID: id } });
  }
}
