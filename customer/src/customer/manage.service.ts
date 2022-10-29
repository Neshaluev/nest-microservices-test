import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './db/customer/customer.repository';
import { WishlistProduct } from '../type/wishlist-product';
import { CartProduct } from 'src/type/cart-product';

@Injectable()
export class ManageService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async eventDistribution(
    event: string,
    customerId: string,
    data: any,
    qty?: number,
  ) {
    switch (event) {
      case 'ADD_TO_WISHLIST':
        this.addWishlistItem(customerId, data);
        break;
      case 'REMOVE_FROM_WISHLIST':
        this.removeWishlistItem(customerId, data);
        break;
      case 'ADD_TO_CART':
        this.addToCart(customerId, data, qty);
        break;
      case 'REMOVE_FROM_CART':
        this.removeFromCart(customerId, data, qty);
        break;
      case 'CREATE_ORDER':
        return {};
    }
  }

  async getWishlistById(customerId: string) {
    const profile = await this.customerRepository.findOneById(customerId);
    return profile.wishlist;
  }

  async addWishlistItem(customerId: string, product: WishlistProduct) {
    let profile = await this.customerRepository.findOneById(customerId);
    if (profile) {
      let wishlist = profile.wishlist;
      wishlist.push(product as any);
      profile.wishlist = wishlist;
    }
    const result = await profile.save();
    return result;
  }

  async removeWishlistItem(customerId: string, product: WishlistProduct) {
    let profile = await this.customerRepository.findOneById(customerId);
    if (profile) {
      let wishlist = profile.wishlist;
      let filterList = wishlist.filter((item) => item._id != product._id);
      profile.wishlist = filterList;
    }
    const result = await profile.save();
    return result;
  }

  async addToCart(customerId: string, product: CartProduct, qty: number) {
    const profile = await this.customerRepository.findOneById(customerId);
    if (profile) {
      const cartItem = {
        product,
        unit: qty,
      };
      let cartItems = profile.cart;
      cartItems.push(cartItem as any);
      profile.cart = cartItems;
    }

    return await profile.save();
  }

  async removeFromCart(customerId: string, product: any, qty: number) {
    const profile = await this.customerRepository.findOneById(customerId);
    if (profile) {
      let cartItems = profile.cart;
      if (cartItems.length > 0) {
        let filterList = cartItems.filter((item) => item._id != product._id);
        profile.cart = filterList;
      }
      return await profile.save();
    }
  }

  async createOrder() {}
}
