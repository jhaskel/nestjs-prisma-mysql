import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Patch, ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(3000);
}
bootstrap();
