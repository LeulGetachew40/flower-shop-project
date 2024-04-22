import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // for the DTOs

import { DatabaseService } from './../database/database.service';

@Injectable()
export class ItemsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createItemDto: Prisma.ItemsCreateInput) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
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
