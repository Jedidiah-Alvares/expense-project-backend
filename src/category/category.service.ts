import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategory(name: string) {
    return await this.categoryModel.aggregate([
      {
        $match: {
          name: name,
        },
      },
      {
        $project: {
          _id: 0,
          category: '$category.name',
        },
      },
    ]);
  }

  async getAll(name: string) {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    return await this.categoryModel.aggregate([
      {
        $match: {
          name: name,
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          _id: '$category.name',
          budget: {
            $last: '$category.budget',
          },
        },
      },
      {
        $project: {
          _id: '$_id',
          budget: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ['$budget.month', currentMonth],
                  },
                  {
                    $eq: ['$budget.year', currentYear],
                  },
                ],
              },
              '$budget.amount',
              -1,
            ],
          },
        },
      },
    ]);
  }

  async addCategory(category: Category) {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async editCategory(
    name: string,
    category: {
      name: string;
      budget: {
        month: number;
        year: number;
        amount: number;
      }[];
    },
  ) {
    return await this.categoryModel.updateOne(
      { name: name },
      {
        $push: {
          category: category,
        },
      },
    );
  }

  async addBudget(
    name: string,
    category: string,
    budget: {
      month: number;
      year: number;
      amount: number;
    },
  ) {
    return await this.categoryModel.updateOne(
      {
        name: name,
      },
      {
        $push: {
          'category.$[element].budget': budget,
        },
      },
      {
        arrayFilters: [{ 'element.name': { $eq: category } }],
      },
    );
  }

  async editBudget(
    name: string,
    category: string,
    budget: {
      month: number;
      year: number;
      amount: number;
    },
  ) {
    return await this.categoryModel.updateOne(
      {
        name: name,
      },
      {
        $push: {
          'category.$[element].budget': budget,
        },
      },
      {
        arrayFilters: [{ 'element.name': { $eq: category } }],
      },
    );
  }

  async deleteBudget(name: string, category: string) {
    return await this.categoryModel.updateOne(
      {
        name: name,
      },
      {
        $pop: {
          'category.$[element].budget': 1,
        },
      },
      {
        arrayFilters: [{ 'element.name': { $eq: category } }],
      },
    );
  }
}
