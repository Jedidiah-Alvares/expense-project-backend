import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

// schema of the expense model
@Schema({ collection: 'Category' })
export class Category {
  @Prop()
  name: string;

  @Prop()
  category: {
    name: string;
    budget: {
      month: number;
      year: number;
      amount: number;
    }[];
  }[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
