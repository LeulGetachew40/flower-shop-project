import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { DatabaseModule } from './../database/database.module';

import { UserNameGeneratorMiddleware } from './../common/middlewares/user.document.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserNameGeneratorMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST }); // here is the problem, adjust the path to meet the users signup to make the middleware work
  }
}
