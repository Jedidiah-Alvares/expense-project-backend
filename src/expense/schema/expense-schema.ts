import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpensesDocument = Expenses & Document;

// schema of the expense model
@Schema({ collection: 'Expenses' })
export class Expenses {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  date: Date;

  @Prop()
  expense: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expenses);
