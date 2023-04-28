import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './schema/expense-schema';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Expenses',
        schema: ExpenseSchema,
        collection: 'Expenses',
      },
    ]),
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
