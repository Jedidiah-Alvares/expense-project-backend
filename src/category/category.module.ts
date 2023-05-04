import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category-schema';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
        collection: 'Category',
      },
    ]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
