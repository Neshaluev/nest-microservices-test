import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "src/entities/IdentifiableEntittySchema";

@Schema({ collection: 'address' })
// export class CustomerSchema extends IdentifiableEntitySchema{
export class AddressSchema{
    @Prop()
    readonly street: string

    @Prop()
    readonly postalCode: string

    @Prop()
    readonly city: string

    @Prop()
    readonly country: string
}


export const AddressFactorySchema = SchemaFactory.createForClass(AddressSchema);