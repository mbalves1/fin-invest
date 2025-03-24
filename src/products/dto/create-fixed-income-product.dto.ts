import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFixedIcomeProductDto {
  @IsString()
  name: string;

  @IsString()
  issuer: string; // Instituição financeira emissora

  @IsString()
  type: string; // Ex: CDB, LCI, LCA, etc.

  @IsNumber()
  interestRate: number; // Taxa de juros

  @IsString()
  interestType: string; // Ex: Prefixado, Pós-fixado, Híbrido

  @IsString()
  indexer: string; // Ex: CDI, IPCA, Selic (se pós-fixado)

  @IsDate()
  @Type(() => Date)
  maturityDate: Date; // Data de vencimento

  @IsString()
  liquidity: string; // Ex: Diária, No vencimento

  @IsNumber()
  minimumInvestment: number; // Aplicação mínima

  @IsString()
  taxation: string; // Ex: IR, IOF, Isento

  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}
