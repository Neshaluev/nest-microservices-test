import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderSchema } from "./order.schema";

export class OrderRepository{
    constructor(
        @InjectModel(OrderSchema.name)
         private orderModel: Model<OrderSchema>,
    ){
    }

    async create(orderDto: any){
        return this.orderModel.create(orderDto)
    }
    async findByOne(searchData: any){
        return this.orderModel.findOne(searchData)
    }
    async update(id: string, orderData: any) {
        return this.orderModel.updateOne({_id: id}, {$set: orderData }, { upsert: true })
    }
    async findOneById(id: string) {
        return this.orderModel.findOne({_id: id})
    }
    async findAll(){
        return this.orderModel.find({})
    }    
   
}