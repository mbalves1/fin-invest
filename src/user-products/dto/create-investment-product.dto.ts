import { Type } from 'class-transformer'; // Importando corretamente do class-transformer
import { IsInt, Min, IsOptional } from 'class-validator';

export class CreateInvestmentProductDto {
  @IsInt()
  @Type(() => String)
  userId: string;

  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @Min(1, { message: 'A quantidade deve ser pelo menos 1.' })
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @Type(() => Date)
  purchasedAt?: Date;
}
