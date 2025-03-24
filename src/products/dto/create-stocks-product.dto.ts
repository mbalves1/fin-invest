import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

// DTO para Ações
export class CreateStockDto {
  @IsString()
  name: string;

  @IsString()
  ticker: string;

  @IsString()
  sector: string;

  @IsNumber()
  marketCap: number;

  @IsOptional()
  @IsNumber()
  dividendYield?: number;

  @IsNumber()
  lastPrice: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
