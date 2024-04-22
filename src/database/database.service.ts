import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DatabaseService extends Prisma implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
