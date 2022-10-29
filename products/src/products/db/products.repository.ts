import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "src/entities/base-entity.repository";
import { ProductDto } from "../dto/create-product.dto";
import { ProductsSchemaFactory } from "./products-schema.factory";
import { ProductsModel } from "./products.model";
import { ProductSchema } from "./products.schema";


export class ProductsRepository extends BaseEntityRepository<ProductSchema, ProductsModel>{
    constructor(
        @InjectModel(ProductSchema.name)
         productModel: Model<ProductSchema>,
         productSchemaFactory: ProductsSchemaFactory
    ){
        super(productModel, productSchemaFactory)
    }
}