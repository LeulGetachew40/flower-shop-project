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

@Module({
  imports: [DatabaseModule],
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
