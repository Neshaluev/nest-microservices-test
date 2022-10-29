import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IdentifiableEntitySchema } from 'src/entities/IdentifiableEntittySchema';
import { AddressFactorySchema, AddressSchema } from '../address/address.schema';

import { Cart } from './cart.schema';
import { Orders } from './orders.schema';
import { Wishlist } from './wishlist.schema';

@Schema({ collection: 'customer' })
// export class CustomerSchema extends IdentifiableEntitySchema{
export class CustomerSchema {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: '' })
  phone: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address',
      require: true,
      default: [],
    },
  ])
  address: AddressSchema[] | [];

  @Prop({ default: [] })
  cart: Cart[];

  @Prop({ default: [] })
  wishlist: Wishlist[];

  @Prop({ default: [] })
  orders: Orders[];
}
