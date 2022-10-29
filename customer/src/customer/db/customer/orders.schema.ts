import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Orders {
  @Prop()
  _id: string;

  @Prop()
  amount: number;

  @Prop({ default: Date.now() })
  date: Date;
}
