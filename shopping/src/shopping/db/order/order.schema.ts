import { Schema,Prop } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "src/entities/identifiable-entitty-schema";

@Schema({_id: false})
export class Product{
    
    @Prop()
    _id: string

    @Prop() 
    name: string

    @Prop() 
    desc: string

    @Prop()
    banner: string

    @Prop()
    type: string

    @Prop()
    unit: string

    @Prop()
    price: number

    @Prop()
    suplier: string

}


@Schema({_id: false})
export class Items{
    
    @Prop()
    product: [Product]

    @Prop()
    unit: number
}


@Schema({ collection: 'order' })
export class OrderSchema  {
    @Prop()
    orderId: string

    @Prop()
    customerId: string

    @Prop()
    amount: number

    @Prop()
    status: string


    @Prop({ default: []})
    items: Product[]
}