import { IsNumber, IsObject } from 'class-validator';

class InvestmentEntry {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateInvestmentContractDto {
  @IsObject()
  fixed_income: InvestmentEntry;

  @IsObject()
  real_state: InvestmentEntry;

  @IsObject()
  stock: InvestmentEntry;

  @IsObject()
  crypto: InvestmentEntry;
}
