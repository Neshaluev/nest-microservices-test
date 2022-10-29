import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RmqService } from './lib/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<RmqOptions>(RmqService.getOptions());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
