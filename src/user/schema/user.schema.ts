import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  active: string;

  @Prop()
  role: string;

  // @Prop()
  // chat: SupportChat;

  // @Prop()
  // orderHistory: Order[];

  // @Prop()
  // cart: Item[];

  @Prop()
  paymentInfo: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);