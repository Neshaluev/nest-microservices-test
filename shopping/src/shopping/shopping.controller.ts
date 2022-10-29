import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from 'src/lib/rmq/rmq.service';
import { ShoppingManageService } from './shopping-manage.service';

@Controller('shopping')
export class ShoppingController {
  constructor(
    private readonly shoppingService: ShoppingService,
    private readonly rmqService: RmqService,
    private readonly shoppingManageService: ShoppingManageService,
  ) {}

  @Get('/orders')
  getOrders() {
    return this.shoppingService.getAll();
  }

  @Post('/order')
  createOrder(@Body() data: any) {
    return this.shoppingService.createCart(data);
  }

  @MessagePattern('EVENT_ORDER')
  eventWishList(@Payload() payload: any, @Ctx() context: RmqContext) {
    const { event, data } = payload;
    this.shoppingManageService.eventDistribution(
      event,
      data.userId,
      data.product,
      data.qty,
    );
    this.rmqService.ack(context);
  }
}
