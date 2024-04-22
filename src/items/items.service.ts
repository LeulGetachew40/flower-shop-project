import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // for the DTOs

import { DatabaseService } from './../database/database.service';

@Injectable()
export class ItemsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createItemDto: Prisma.ItemsCreateInput) {
    return await this.databaseService.items.create({ data: createItemDto });
  }

  findAll() {
    return 'here return all items if no query is provided, but filter items if there is a query object';
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: Prisma.ItemsUpdateInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
