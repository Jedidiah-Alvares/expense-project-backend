/* eslint-disable prettier/prettier */
import { ParseIntPipe } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class budgetdto {
  @IsNotEmpty()
  month: number;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  amount: number;
}
