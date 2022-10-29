import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntityFactory } from '../../entities/entity.factory';
import { ProductsModel } from './products.model';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductFactory implements EntityFactory<ProductsModel> {
  constructor(
    private readonly productEntityRepository: ProductsRepository,
  ) {}

  async create(
    name: string,
    desc: string,
    banner: string,
    type: string,
    unit: number,
    price: number,
    available: boolean,
    suplier: string,

  ): Promise<ProductsModel> {
    const product = new ProductsModel(
      new ObjectId().toHexString(),
      name, 
      desc,
      banner,
      type,
      unit,
      price,
      available,
      suplier,
    );


    try {
      await this.productEntityRepository.create(product);

      return product
    } catch (error) {

      throw new NotFoundException('Error factory.');
      
    }

  }
}
