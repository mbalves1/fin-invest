import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRealEstateFundDto {
  @IsString()
  name: string;

  @IsString()
  ticker: string;

  @IsString()
  category: string;

  @IsNumber()
  dividendYield: number;

  @IsNumber()
  netWorth: number;

  @IsNumber()
  lastDividend: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
