export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  isActive: boolean;
}

export interface Product {
  id: number;
  bank: string;
  rateType: string;
  investmentDate: Date;
  dueDate: Date;
  rate: number;
  initialInvestment: number;
  currentValue: number;
  isLiquid: boolean;
  quantity: number;
}

export interface UserProduct {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  purchasedAt: Date;
  user: any;
  product: any;
}
