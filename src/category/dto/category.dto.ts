/* eslint-disable prettier/prettier */
import { IsNotEmpty} from 'class-validator';
import { budgetdto } from './budget.dto';

export class categorydto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    budget: budgetdto[];

  }
