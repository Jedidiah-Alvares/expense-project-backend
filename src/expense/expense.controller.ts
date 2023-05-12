/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expenses } from './schema/expense-schema';
import { customFilter } from './dto/customFilter.dto';

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
  async getWeeklyExpense(@Param('name') name: string, @Param('category') category: string, @Param('num', ParseIntPipe) num: number) {
    return await this.expenseService.getWeeklyExpense(name, category, num);
  }

  // filter by category and return monthly expense
  @Get('/getMonthly/:name/:category/:num')
  async getMonthlyExpense(
    @Param('name') name: string,
    @Param('category') category: string,
    @Param('num', ParseIntPipe) num: number,
  ) {
    return await this.expenseService.getMonthlyExpense(name, category, num);
  }

  @Get('/getMonthly/:name/:category/:month/:year')
  async getMonthlyBudget(
    @Param('name') name: string,
  @Param('category') category: string,
  @Param('month') month: number,
  @Param('year') year: number){
    return await this.expenseService.getMonthlyBudget(name, category, month, year)
  }

  @Get('/getMonthExpense/:name/:month/:year')
  async getMonthExpense(
    @Param('name') name: string,
  @Param('month') month: number,
  @Param('year') year: number){
    return await this.expenseService.getMonthExpense(name, month, year)
  }

  @Post('/customFilter')
  async getCustomFilter(@Body() payload:customFilter){
    const fromDate = new Date(payload.fromDate);
    const toDate = new Date(payload.toDate)
    return await this.expenseService.getCustomFilter(payload.name, fromDate, toDate)

  }
}


