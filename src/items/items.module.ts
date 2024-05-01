import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from './../database/database.module';
import { ItemDocumentMiddleware } from './../common/middlewares/item.document.middleware';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
@Module({
  imports: [DatabaseModule, JwtModule.register({ secret: env.JWT_SECRET })],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ItemDocumentMiddleware)
      .forRoutes({ path: 'items', method: RequestMethod.POST });
  }
}
