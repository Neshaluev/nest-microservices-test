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
    items: Product[]

    @Prop()
    unit: number
}


@Schema({ collection: 'cart' })
// export class CartSchema  extends IdentifiableEntitySchema{
export class CartSchema{
    @Prop()
    customerId: string


    @Prop({ default: [] })
    items: Product[]
}