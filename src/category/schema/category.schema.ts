import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongoSchema } from 'mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

class Option {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  isChild: boolean;

  @Prop([{ type: MongoSchema.Types.ObjectId, ref: 'Category' }])
  subcategory: Category[];

  @Prop({ type: Array })
  items: any;

  @Prop()
  options: Option[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
