import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Wishlist {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  banner: string;

  @Prop()
  avalable: boolean;

  @Prop()
  price: number;
}
