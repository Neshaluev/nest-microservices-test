import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BILLING_SERVICE } from './constans/services';
import { DatabaseModule } from './database/database.module';
import { RmqModule } from './lib/rmq/rmq.module';
import { RmqService } from './lib/rmq/rmq.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, 
    ProductsModule,
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ONLINE_STORE',
          queueOptions: {
            durable: false
          },
          // noAck: false,
        },
      },
    ]),
    // RmqModule.register({
    //   name: BILLING_SERVICE,
    // })
  ],
  controllers: [AppController],
  providers: [AppService, RmqService],
})
export class AppModule {}
