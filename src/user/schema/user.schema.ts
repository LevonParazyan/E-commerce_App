import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';

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

  @Prop()
  refresh_token: string; // add a refresh_token field to the user schema
}

export const UserSchema = SchemaFactory.createForClass(User);
