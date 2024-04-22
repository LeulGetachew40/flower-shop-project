import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
@Module({
  imports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
