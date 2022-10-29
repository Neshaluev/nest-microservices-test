import { ForbiddenException, Injectable } from '@nestjs/common';
import { CustomerRepository } from './db/customer/customer.repository';
import { AddressDto } from './dto/address.dto';
import { CustomerDto } from './dto/customer.dto';
import { AddressRepository } from './db/address/address.repository';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  async create(customerDto: CustomerDto) {
    return this.customerRepository.create(customerDto);
  }

  async addNewAddress(customerId: string, addressDto: AddressDto) {
    let customer = await this.customerRepository.findOneById(customerId);
    if (customer) {
      const newAddress = await this.addressRepository.create(addressDto);
      //@ts-ignore
      customer.address.push(newAddress);
    }
    return await customer.save();
  }

  async manageCart(customerId: string, productDto: ProductDto) {
    let customer = await this.customerRepository.findOneById(customerId);
    if (!customer) {
      throw new ForbiddenException('Error.');
    }
    const data = {
      product: productDto,
      unit: 1,
    };
    customer.cart.push(data as any);
    await customer.save();
    return await customer.save();
  }
}
