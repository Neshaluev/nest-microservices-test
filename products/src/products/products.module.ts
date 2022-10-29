import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductFactory } from './db/products-model.factory';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ProductSchema } from './db/products.schema';
import { ProductsRepository } from './db/products.repository';
import { ProductsSchemaFactory } from './db/products-schema.factory';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/common/strategies/accessToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductSchema.name,
        schema: SchemaFactory.createForClass(ProductSchema),
      },
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ONLINE_STORE',
          queueOptions: {
            durable: false,
          },
          // noAck: false,
        },
      },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductFactory,
    ProductsSchemaFactory,
    AccessTokenStrategy,
  ],
})
export class ProductsModule {}
