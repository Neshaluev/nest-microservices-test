import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy
    ) {
      this.client.connect()
    }

    @Get()
    getHello(): string {
      this.client.emit<any>('message_printed_2', JSON.stringify('Hello World'));
      // this.client.emit<any>('notifications', JSON.stringify('Hello World'));
      return 'Hello World printed';
    }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @EventPattern('message_printed')
  async handleMessagePrinted(data: any){
    console.log('Полученно событие --->', data)
  }
  

  @MessagePattern({cmd: 'get_notifications'})
  getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
  
    console.log('original message notification data ---->', data)
    // console.log('original message notification ---->', originalMsg)
    console.log('original message notification ---->', originalMsg.content.toString())


    // channel.ack(originalMsg);
    // channel.ack(data);

    // return 'send string'
    return data
  }
  
}
