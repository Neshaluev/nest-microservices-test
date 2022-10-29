import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './lib/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<RmqOptions>(RmqService.getOptions());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
