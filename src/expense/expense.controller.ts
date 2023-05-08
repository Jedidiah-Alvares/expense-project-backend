/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expenses } from './schema/expense-schema';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  // get the expenses for expense feature
  // name is the username and num is the page number
  // sends back 6 records
  @Get('/:name/:num')
  async getAll(@Param('name') name: string, @Param('num') num: number) {
    return await this.expenseService.getExpenses(name, num);
  }

  // adds the new expense
  @Post('/add')
  async addExpense(@Body() expense: Expenses) {
    return await this.expenseService.addExpense(expense);
  }

  // filter by category and return weekly expense
  @Get('/getWeekly/:name/:category/:num')
  async getWeeklyExpense(@Param('name') name: string, @Param('category') category: string, @Param('num') num: number) {
    return await this.expenseService.getWeeklyExpense(name, category, num);
  }

  // filter by category and return monthly expense
  @Get('/getMonthly/:name/:category/:num')
  async getMonthlyExpense(
    @Param('name') name: string,
    @Param('category') category: string,
    @Param('num') num: number,
  ) {
    return await this.expenseService.getMonthlyExpense(name, category, num);
  }

  // gets the monthly budget assigned to the category
  @Get('/getMonthly/:name/:category/:month/:year')
  async getMonthlyBudget(
    @Param('name') name: string,
  @Param('category') category: string,
  @Param('month') month: number,
  @Param('year') year: number){
    return await this.expenseService.getMonthlyBudget(name, category, month, year)
  }
}
