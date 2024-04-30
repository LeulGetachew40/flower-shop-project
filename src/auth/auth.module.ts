import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from './../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserNameGeneratorMiddleware } from 'src/common/middlewares/user.document.middleware';
@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserNameGeneratorMiddleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST }); // here is the problem, adjust the path to meet the users signup to make the middleware work
  }
}
