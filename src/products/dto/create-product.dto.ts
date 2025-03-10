import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  bank: string;

  @IsString()
  name: string;

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

  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(1)
  quantityRemaining: number;

  @IsString()
  risk: string; // Exemplo: 'low', 'medium', 'high'

  @IsString()
  investmentHorizon: string; // Exemplo: 'curto', 'medio', 'longo prazo'

  @IsString()
  investmentType: string; // Exemplo: 'stocks', 'renda fixa', 'imoveis'
}
