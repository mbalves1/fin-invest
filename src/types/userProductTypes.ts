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
  userId: number;
  productId: number;
  quantity: number;
  purchasedAt: Date;
  user: User;
  product: Product;
}
