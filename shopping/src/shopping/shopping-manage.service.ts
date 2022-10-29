import { Injectable } from '@nestjs/common';
import { CartRepository } from './db/card/cart.repository';

@Injectable()
export class ShoppingManageService {
  constructor(private readonly cartRepository: CartRepository) {}

  async eventDistribution(
    event: string,
    customerId: string,
    data: any,
    qty?: number,
  ) {
    switch (event) {
      case 'ADD_TO_CART':
        this.addToCart(customerId, data, qty);
        break;
      case 'REMOVE_FROM_CART':
        this.removeFromCart(customerId, data, qty);
        break;
    }
  }

  async addToCart(customerId: string, product: any, qty: number) {
    let customerCart = null;
    const cartItem = {
      product,
      unit: qty,
    };
    customerCart = await this.cartRepository.findByOne({ customerId });
    if (!customerCart) {
      customerCart = await this.cartRepository.create({
        customerId,
        items: [],
      });
    }
    let cartItems = customerCart.items;
    cartItems.push(cartItem);
    customerCart.items = cartItems;
    return await customerCart.save();
  }

  async removeFromCart(customerId: string, product: any, qty: number) {
    let customerCart = await this.cartRepository.findByOne({ customerId });
    if (customerCart) {
      let cartItems = customerCart.items;
      if (cartItems.length > 0) {
        let filterList = cartItems.filter((item) => item._id != product._id);
        customerCart.items = filterList;
      }
    }
    return await customerCart.save();
  }
}
