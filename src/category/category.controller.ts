import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category-schema';
import { budgetEditdto } from './dto/budgetEdit.dto';
import { categorydto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // get All category
  @Get('/getAll/:name')
  async getAllCategory(@Param('name') name: string) {
    return await this.categoryService.getAllCategory(name);
  }

  // get All category and their budgets
  @Get('/getcategorybudget/:name')
  async getCategoryBudget(@Param('name') name: string) {
    return await this.categoryService.getCategoryBudget(name);
  }

  @Post('/add')
  async addCategory(@Body() category: Category) {
    return await this.categoryService.addCategory(category);
  }

  @Put('/edit/budget/:name')
  async editBudget(@Param('name') name: string, @Body() budget: budgetEditdto) {
    const budgets = await this.categoryService.getCategoryBudget(name);
    let i = 0;
    for (; i < budgets.length; i++) {
      if (budgets[i]._id === budget.category) {
        break;
      }
    }

    const date = new Date();
    const payload = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      amount: budget.amount,
    };

    await this.categoryService.deleteBudget(name, budgets[i]._id);
    return await this.categoryService.editBudget(name, budgets[i]._id, payload);
  }

  @Put('/edit/:name')
  async editCategory(
    @Param('name') name: string,
    @Body() category: categorydto,
  ) {
    return this.categoryService.editCategory(name, category);
  }
}
