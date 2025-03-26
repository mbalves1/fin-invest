export interface RealEstateTypes {
  name: string;
  ticker: string;
  category: string;
  dividendYield: number;
  netWorth: number;
  lastDividend: number;
  createdAt: Date;
  updatedAt: Date;
}

export type RealEstateTypesRequestBody = Omit<
  RealEstateTypes,
  'createdAt' | 'updatedAt'
>;
