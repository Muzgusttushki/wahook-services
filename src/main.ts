import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService('VIS')
  });

  app.setGlobalPrefix('v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    transform: true,
  }));
  const address = '192.168.0.23';
  await app.listen(3303, address);
}

bootstrap();
