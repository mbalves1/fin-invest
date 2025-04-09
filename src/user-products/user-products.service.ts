import { CreateInvestmentContractDto } from './dto/create-contract-user-product.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserProductRepository } from './user-product.repository';
import { UserProduct } from 'src/types/userProductTypes';
import { UserRepository } from 'src/users/user.repository';
import { ProductRepository } from 'src/products/product.repository';
import { CreateInvestmentProductDto } from './dto/create-investment-product.dto';
import { FixedIncome } from 'src/types/responseFixedIncomeTypes';
import { StockTypes } from 'src/types/stockTypes';

@Injectable()
export class UserProductsService {
  constructor(
    private userProductRepo: UserProductRepository,
    private userRepo: UserRepository,
    private productRepo: ProductRepository,
  ) {}

  async findAll(@Req() req) {
    return this.userProductRepo.find(req);
  }

  // async findUserById(id: string): Promise<UserProduct[]> {
  //   return this.userProductRepo.findByUser(id);
  // }

  // async createInvestments(
  //   userId: string,
  //   createInvestmentContractDto: CreateInvestmentContractDto,
  // ) {
  //   const userInvestments = Object.entries(createInvestmentContractDto).map(
  //     ([key, value]) => ({
  //       ...value,
  //     }),
  //   );

  //   userInvestments.forEach((invest) => this.create(userId, invest));
  //   return 'Success';
  // }

  async simulateWallet(id: string, createUserProductDto: CreateUserProductDto) {
    const { riskTolerance, currentPortfolioValue } =
      await this.userRepo.findById(id);

    const percentageProfile = this.getPercentageByProfile(riskTolerance);

    // Essa variavel deve retornar os produtos fixed income,
    const productsFixedIncome = await this.getProductsFixedIncome(
      percentageProfile.fixed_income * currentPortfolioValue,
    );
    // preciso verificar se a porcentagem pra investir e maior que o minimo
    // se nao investir o maximo que da e vai para o proximo

    const productsRE = await this.getProductsRealEstate();
    const productsStocks = await this.getProductsStocks();
    const productsCrypto = await this.getProductsCrypto();

    const result = {
      fixed_income: {
        offer: productsFixedIncome,
        value: currentPortfolioValue * percentageProfile.fixed_income,
      },
      real_state_funds: {
        offer: productsRE,
        value: currentPortfolioValue * percentageProfile.real_estate_funds,
      },
      stocks: {
        offer: productsStocks,
        value: currentPortfolioValue * percentageProfile.stocks,
      },
      productsCrypto: {
        offer: productsCrypto,
        value: currentPortfolioValue * percentageProfile.crypto,
      },
    };

    return result;
  }

  // Get Products from Fixed Income.
  async getProductsFixedIncome(
    currentValueToInvest: number,
  ): Promise<FixedIncome> {
    const allProducts = await this.userProductRepo.findAllFixedIncome();
    const sortByHighestRate = allProducts.sort(
      (a, b) => b.interestRate - a.interestRate,
    );

    const applicableProduct = sortByHighestRate.find(
      (product) => product.minimumInvestment <= currentValueToInvest,
    );

    return applicableProduct;
  }

  // Get Products from Real Estate
  // Maior yield maior rendimento maior patrimonio maior seguranca
  async getProductsRealEstate() {
    const allProducts = await this.userProductRepo.findAllRealEstate();
    const applicableProduct = allProducts.sort(
      (a: any, b: any) => b.dividendYield - a.dividendYield,
    );
    return applicableProduct[0];
  }

  // Get Products from Stocks
  async getProductsStocks(): Promise<StockTypes> {
    const allProducts = await this.userProductRepo.findAllStocksProduct();
    // Ordena primeiro pelo maior Dividend Yield, depois pelo maior Market Cap
    allProducts.sort((a, b) => {
      if (b.dividendYield !== a.dividendYield) {
        return b.dividendYield - a.dividendYield;
      }
      return b.marketCap - a.marketCap;
    });

    return allProducts[0]; // Retorna a melhor ação
  }

  // Get Products from Crypto
  async getProductsCrypto(): Promise<any> {
    const allProducts = await this.userProductRepo.findAllCryptoProduct();
    // Ordena primeiro pelo maior Market Cap, depois pelo maior preço unitário
    allProducts.sort((a, b) => {
      if (b.marketCap !== a.marketCap) {
        return b.marketCap - a.marketCap;
      }
      return b.lastPrice - a.lastPrice;
    });

    return allProducts[0];
  }

  getPercentageByProfile(tolerance: string) {
    const allocations = {
      conservative: {
        fixed_income: 0.9,
        real_estate_funds: 0.1,
      },
      moderate: {
        fixed_income: 0.5,
        real_estate_funds: 0.3,
        stocks: 0.2,
      },
      aggressive: {
        fixed_income: 0.1,
        real_estate_funds: 0.5,
        stocks: 0.3,
        crypto: 0.1,
      },
    };
    return allocations[tolerance.toLowerCase()] || null;
  }

  async createAnInvestments(
    userId: string,
    createInvestmentContractDto: CreateInvestmentContractDto,
  ): Promise<any> {
    return await this.userProductRepo.createAnInvestment(
      userId,
      createInvestmentContractDto,
    );
  }

  async createSimpleAnInvestment(
    userId: string,
    createInvestmentProductDto: CreateInvestmentProductDto,
  ): Promise<CreateInvestmentProductDto> {
    return await this.userProductRepo.createSimpleInvestment(
      userId,
      createInvestmentProductDto,
    );
  }

  async deleteInvestmentContract(
    contractId: string,
    userId: string,
  ): Promise<{ success: boolean }> {
    const contract = await this.userProductRepo.findInvestmentById(contractId);

    if (!contract) {
      throw new NotFoundException('Investment not found!');
    }

    // Verificação de propriedade do contrato (regra de negócio)
    if (contract.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this investment',
      );
    }

    const deleted = await this.userProductRepo.deleteInvestment(contractId);

    return { success: deleted };
  }
}
