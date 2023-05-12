/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class budgetdto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
