import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());
<<<<<<< HEAD
  await app.listen(process.env.PORT || 3000);
=======
  await app.listen(3000);
>>>>>>> d3682b0bc4ca8bc80a084bdd93fe8ee56fc64a50
}
bootstrap();
