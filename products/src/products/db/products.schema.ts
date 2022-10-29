import { Schema,Prop } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "src/entities/identifiable-entitty-schema";


@Schema({ collection: 'product' })
export class ProductSchema extends IdentifiableEntitySchema {

    @Prop()
    readonly name: string

    @Prop()
    readonly desc: string

    @Prop()
    readonly banner: string

    @Prop()
    readonly type: string

    @Prop()
    readonly unit: number

    @Prop()
    readonly price: number

    @Prop()
    readonly available: boolean

    @Prop()
    readonly suplier: string
}