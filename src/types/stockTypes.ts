export interface StockTypes {
  name: string;
  ticker: string;
  sector: string;
  marketCap: number;
  dividendYield: number;
  lastPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export type StockTypesRequestBody = Omit<StockTypes, 'createdAt' | 'updatedAt'>;
