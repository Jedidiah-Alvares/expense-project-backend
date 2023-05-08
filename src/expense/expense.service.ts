/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Expenses, ExpensesDocument } from './schema/expense-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expenses.name) private expenseModel: Model<ExpensesDocument>,
  ) {}

  async getExpenses(user: string, num: number) {
    return await this.expenseModel
      .find({ name: user })
      .sort({ date: -1 , _id: -1}) // get latest records
      .skip(num) // skips the "num" number of records
      .limit(6); // get 6 records
  }

  // adds the new expense
  async addExpense(expense: Expenses) {
    const newExpense = new this.expenseModel(expense);
    return await newExpense.save();
  }

  // filter by category and return weekly expense
  async getWeeklyExpense(name: string, category: string, num: number) {

    return await this.expenseModel
      .aggregate([
        {
          $match: { name: name, category: category },
        },
        {
          $group: {
            _id: {
              weekStart: {
                $dateSubtract: {
                  startDate: '$date',
                  unit: 'day',
                  amount: {
                    $subtract: [{ $dayOfWeek: '$date' }, 1],
                  },
                },
              },
              weekEnd: {
                $dateAdd: {
                  startDate: '$date',
                  unit: 'day',
                  amount: {
                    $subtract: [7, { $dayOfWeek: '$date' }],
                  },
                },
              },
            },
            totalAmount: { $sum: '$expense' },
          },
        },
        {
          $project: {
            weekEnd: '$_id.weekEnd',
            totalAmount: '$totalAmount',
          },
        },
      ])
      .sort({ weekEnd: -1 })
      .skip(num) // skips the "num" number of records;
      .limit(11); // get 11 records
  }

  // filter by category and return monthly expense
  async getMonthlyExpense(name: string, category: string, num: number) {
    return await this.expenseModel
      .aggregate([
        {
          $match: { name: name, category: category },
        },
        {
          $group: {
            _id: {
              month: { $month: '$date' },
              year: { $year: '$date' },
            },
            totalAmount: { $sum: '$expense' },
          },
        },
        {
          $project: {
            month: '$_id.month',
            year: '$_id.year',
            totalAmount: '$totalAmount',
          },
        },
      ])
      .sort({ year: -1, month: -1 })
      .skip(num) // skips the "num" number of records;
      .limit(11); // get 6 records
  }

  async getMonthlyBudget(name: string,category: string,month: number,year: number){
    return await this.expenseModel
      .aggregate([
        {
          $match: { name: name, category: category },
        },
        {
          $group: {
            _id: {
              month: { $month: '$date' },
              year: { $year: '$date' },
            },
            totalAmount: { $sum: '$expense' },
          },
        },
        {
          $match:{'_id.month':Number(month), '_id.year': Number(year) }
        },
        {
          $project: {
            
            totalAmount: 1,
          },
        },
      ])
  }
}
