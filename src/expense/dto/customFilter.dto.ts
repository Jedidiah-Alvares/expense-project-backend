/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class customFilter {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  fromDate: string;

  @IsNotEmpty()
  toDate: string;
}
