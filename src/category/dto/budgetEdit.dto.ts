/* eslint-disable prettier/prettier */
import { IsNotEmpty} from 'class-validator';

export class budgetEditdto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  amount: number;
}