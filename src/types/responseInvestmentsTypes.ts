export interface InvestmentOffer {
  id: number;
  bank: string;
  name: string;
  rateType: 'posfixado' | 'variavel';
  investmentDate: string; // ou Date, se for transformar antes de usar
  dueDate: string;
  rate: number;
  initialInvestment: number;
  currentValue: number;
  isLiquid: boolean;
  quantity: number;
  quantityRemaining: number | null;
  risk: 'low' | 'medium' | 'hight';
  investmentHorizon: 'short_term' | 'medium_term' | 'long_term' | null;
  investmentType: 'fixed_income' | 'real_estate_funds' | 'stocks';
}

export interface InvestmentCategory {
  offer: InvestmentOffer;
  value: number;
}

export interface InvestmentResponse {
  fixed_income: InvestmentCategory;
  real_state_funds: InvestmentCategory;
  stocks: InvestmentCategory;
}
