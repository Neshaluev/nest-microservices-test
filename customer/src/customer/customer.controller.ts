import {
  Controller,
  Post,
  Body,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RmqService } from 'src/lib/rmq/rmq.service';
import { EventPayload } from 'src/type/event-payload';
import { CustomerService } from './customer.service';
import { AddressDto } from './dto/address.dto';
import { CustomerDto } from './dto/customer.dto';
import { ProductDto } from './dto/product.dto';
import { ManageService } from './manage.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    @Inject('CUSTOMER_SERVICE') private readonly client: ClientProxy,
    private readonly rmqService: RmqService,
    private readonly manageService: ManageService,
  ) {}

  //   @Post()
  //   async create(@Body() customerDto: CustomerDto) {
  //     return this.customerService.create(customerDto);
  //   }

  @UseGuards(AccessTokenGuard)
  @Post('/address/:id')
  async address(
    @Param('id') customerId: string,
    @Body() addressDto: AddressDto,
  ) {
    return this.customerService.addNewAddress(customerId, addressDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/manage-cart/:id')
  async ManageCart(
    @Param('id') customerId: string,
    @Body() productDto: ProductDto,
  ) {
    return this.customerService.manageCart(customerId, productDto);
  }

  @MessagePattern('EVENT_CUSTOMER')
  eventWishList(@Payload() payload: EventPayload, @Ctx() context: RmqContext) {
    const { event, data } = payload;
    this.manageService.eventDistribution(
      event,
      data.userId,
      data.product,
      data.qty,
    );
    this.rmqService.ack(context);
  }
}
