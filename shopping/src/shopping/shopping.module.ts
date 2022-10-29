import {MongooseModule, SchemaFactory} from "@nestjs/mongoose"
import { Module } from '@nestjs/common';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';
import { CartSchema } from "./db/card/cart.schema";
import { OrderSchema } from "./db/order/order.schema";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RmqService } from "src/lib/rmq/rmq.service";
import { CartRepository } from "./db/card/cart.repository";
import { ShoppingManageService } from "./shopping-manage.service";
import { OrderRepository } from "./db/order/order.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartSchema.name,
        schema: SchemaFactory.createForClass(CartSchema)
      },
      {
        name: OrderSchema.name,
        schema: SchemaFactory.createForClass(OrderSchema)
      },
    ]),
    ClientsModule.register([
      {
        name: 'SHOPPING_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ONLINE_STORE',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ShoppingController],
  providers: [ShoppingService, RmqService, CartRepository, ShoppingManageService, OrderRepository]
})
export class ShoppingModule {}
