import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorHandlerService } from './global-error-handler/global-error-handler.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new GlobalErrorHandlerService());
  await app.listen(3000);
}
bootstrap();
