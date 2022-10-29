import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../entities/entity-schema.factory';
import { ProductsModel } from './products.model';
import { ProductSchema } from './products.schema';

@Injectable()
export class ProductsSchemaFactory
  implements EntitySchemaFactory<ProductSchema, ProductsModel> {
  create(product: ProductsModel): ProductSchema {
    return {
      _id: new ObjectId(product.getId()),
      name: product.getName(),
      desc: product.getDesc(),
      banner: product.getBanner(),
      type: product.getType(),
      unit: product.getUnit(),
      price: product.getPrice(),
      available: product.getAvailable(),
      suplier: product.getSuplier(),
    };
  }

  createFromSchema(productSchema: ProductSchema): ProductsModel {
    return new ProductsModel(
      productSchema._id.toHexString(),
      productSchema.name,
      productSchema.desc,
      productSchema.banner,
      productSchema.type,
      productSchema.unit,
      productSchema.price,
      productSchema.available,
      productSchema.suplier
    );
  }
}
