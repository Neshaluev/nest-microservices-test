import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CartSchema } from "./cart.schema";
import {CartDto} from "src/shopping/dto/cart.dto"

export class CartRepository {
    constructor(
        @InjectModel(CartSchema.name)
         private cartModel: Model<CartSchema>,
    ){
    }

    async create(cartDto: any){
        return this.cartModel.create(cartDto)
    }
    async findByOne(searchData: any){
        return this.cartModel.findOne(searchData)
    }
    async update(id: string, cartData: any) {
        return this.cartModel.updateOne({_id: id}, {$set: cartData }, { upsert: true })
    }
    async findOneById(id: string) {
        return this.cartModel.findOne({_id: id})
    }
}