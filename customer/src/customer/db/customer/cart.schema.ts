import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
export class Cart {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  banner: string;

  @Prop()
  price: number;
}

// @Schema({_id: false})
// export class Cart{

//     @Prop()
//     product: Product[]

//     @Prop()
//     unit: number
// }
