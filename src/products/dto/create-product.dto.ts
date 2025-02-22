import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  bank: string;

  @IsString()
  rateType: string;

  @IsDate()
  @Type(() => Date)
  investmentDate: Date;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsNumber()
  rate: number;

  @IsNumber()
  initialInvestment: number;

  @IsNumber()
  currentValue: number;

  @IsBoolean()
  isLiquid: boolean;

  @IsNumber()
  quantity: number;
}
