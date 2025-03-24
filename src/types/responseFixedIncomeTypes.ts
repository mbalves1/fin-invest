export interface FixedIncome {
  name: string; // 'CDB Banco XP'
  issuer: string; // 'Banco XP'
  type: string; // 'CDB'
  interestRate: number;
  interestType: string; // 'Prefixado'
  indexer: string; // 'CDI'
  maturityDate: Date;
  liquidity: string; // 'No vencimento'
  minimumInvestment: number; // 1000
  taxation: string; // 'IR'
  createdAt: Date;
  updatedAt: Date;
}
