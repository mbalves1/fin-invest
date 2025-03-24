import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCryptocurrencyDto {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  marketCap: number;

  @IsNumber()
  circulatingSupply: number;

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
