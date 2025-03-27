export interface CryptoTypes {
  name: string;
  symbol: string;
  marketCap: number;
  circulatingSupply: number;
  lastPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CryptoTypesRequestBody = Omit<
  CryptoTypes,
  'createdAt' | 'updatedAt'
>;
