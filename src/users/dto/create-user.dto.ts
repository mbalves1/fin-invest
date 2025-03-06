import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  email: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthday: Date;

  @IsOptional()
  @ValidateNested({ each: true }) // Valida cada item da lista
  @Type(() => CreateProductDto) // Converte corretamente os itens para DTO
  products?: CreateProductDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // O campo isActive é opcional e se não for fornecido, o padrão será true

  @IsString()
  riskTolerance: string; // Exemplo: 'low', 'medium', 'high'

  @IsString()
  investmentGoals: string; // Exemplo: 'retirement', 'compra de imovel', 'education'

  @IsNumber()
  currentPortfolioValue: number; // Ex: R$ 5000

  @IsString()
  preferredInvestmentType: string; // Exemplo: 'stocks', 'renda fixa', 'imoveis'
}
