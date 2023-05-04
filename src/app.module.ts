import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://expense:Qwerty1234@cluster0.c0ne8dh.mongodb.net/expense?retryWrites=true&w=majority',
    ),
    UserModule,
    ExpenseModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
