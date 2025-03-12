import { CreateInvestmentContractDto } from './dto/create-contract-user-product.dto';
import { Injectable, Req } from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserProductRepository } from './user-product.repository';
import { UserProduct } from 'src/types/userProductTypes';
import { UserRepository } from 'src/users/user.repository';
import { ProductRepository } from 'src/products/product.repository';

@Injectable()
export class UserProductsService {
  constructor(
    private userProductRepo: UserProductRepository,
    private userRepo: UserRepository,
    private productRepo: ProductRepository,
  ) {}

  async create(
    userId: string,
    createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    return await this.userProductRepo.create({
      ...createUserProductDto,
      userId,
    });
  }

  async findAll(@Req() req) {
    return this.userProductRepo.find(req);
  }

  async findUserById(id: string): Promise<UserProduct[]> {
    return this.userProductRepo.findByUser(id);
  }

  async createInvestments(
    userId: string,
    createInvestmentContractDto: CreateInvestmentContractDto,
  ) {
    const userInvestments = Object.entries(createInvestmentContractDto).map(
      ([key, value]) => ({
        ...value,
      }),
    );

    userInvestments.forEach((invest) => this.create(userId, invest));
    return 'Success';
  }

  async createWallet(id: string, createUserProductDto: CreateUserProductDto) {
    const { riskTolerance, currentPortfolioValue } =
      await this.userRepo.findById(id);
    const getProfilePercentage = this.getPercentageByProfile(riskTolerance);

    const productsFixedIncome = await this.getProducts('fixed_income');
    const productsRE = await this.getProducts('real_estate_funds');
    const productsStocks = await this.getProducts('stocks');

    return {
      fixed_income: {
        offer: productsFixedIncome[0],
        value: currentPortfolioValue * getProfilePercentage.fixed_income,
      },
      real_state_funds: {
        offer: productsRE[0],
        value: currentPortfolioValue * getProfilePercentage.real_estate_funds,
      },
      stocks: {
        offer: productsStocks[0],
        value: currentPortfolioValue * getProfilePercentage.stocks,
      },
    };
  }

  async getProducts(type: string) {
    return this.productRepo.find(type);
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

  findOne(id: number) {
    return `This action returns a #${id} userProduct`;
  }

  update(id: number, updateUserProductDto: UpdateUserProductDto) {
    return `This action updates a #${id} ${updateUserProductDto} userProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProduct`;
  }
}
