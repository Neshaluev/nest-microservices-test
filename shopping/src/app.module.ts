import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqModule } from './lib/rmq/rmq.module';
import { RmqService } from './lib/rmq/rmq.service';
import { ShoppingModule } from './shopping/shopping.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    // RmqModule,
    ClientsModule.register([
      {
        name: 'SHOPPING_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ONLINE_STORE_SHOPPING',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ShoppingModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, RmqService,],
})
export class AppModule {}
