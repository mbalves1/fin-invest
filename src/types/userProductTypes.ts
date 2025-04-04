export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  isActive: boolean;
  riskTolerance: string;
  investmentGoals: string;
  currentPortfolioValue: number;
  preferredInvestmentType: string;
}

export interface Product {
  id: number;
  bank: string;
  name: string;
  rateType: string;
  investmentDate: Date;
  dueDate: Date;
  rate: number;
  initialInvestment: number;
  currentValue: number;
  isLiquid: boolean;
  quantity: number;
  quantityRemaining: number;
  risk: string;
  investmentHorizon: string;
  investmentType: string;
}

export interface UserProduct {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  purchasedAt: Date;
  user: User;
  product: Product;
}
