import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // this is what caused the error last time

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
