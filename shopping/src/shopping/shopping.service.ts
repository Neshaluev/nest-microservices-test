import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CartRepository } from './db/card/cart.repository';
import { OrderRepository } from './db/order/order.repository';

@Injectable()
export class ShoppingService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async getAll() {
    return this.orderRepository.findAll();
  }

  async createCart(data: any) {
    const cusomerId = `634bfdaeaa84a5f552990d16`;
    const cart = await this.cartRepository.findByOne({ cusomerId });

    if (cart) {
      let amount = 0;

      let cartItems = cart.items;

      if (cartItems.length > 0) {
        cartItems.map((item: any) => {
          amount += parseInt(item.product.price) * parseInt(item.unit);
        });

        const orderId = uuidv4();

        const order = await this.orderRepository.create({
          orderId,
          customerId: cusomerId,
          amount,
          status: 'received',
          items: cartItems,
        });
        cart.items = [];
        const orderResult = await order.save();
        await cart.save();
        return orderResult;
      }
    }

    return {};
  }
}
