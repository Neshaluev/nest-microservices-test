import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AddressRepository } from './db/address/address.repository';
import {
  AddressFactorySchema,
  AddressSchema,
} from './db/address/address.schema';
import { CustomerRepository } from './db/customer/customer.repository';
import { CustomerSchema } from './db/customer/customer.schema';
import { RmqService } from 'src/lib/rmq/rmq.service';
import { ManageService } from './manage.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/common/strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerSchema.name,
        schema: SchemaFactory.createForClass(CustomerSchema),
      },
      {
        name: AddressSchema.name,
        schema: AddressFactorySchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ONLINE_STORE',
          queueOptions: {
            durable: false,
          },
          noAck: false,
        },
      },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController, CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    AddressRepository,
    RmqService,
    ManageService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [],
})
export class CustomerModule {}
