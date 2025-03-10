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
    createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    return await this.userProductRepo.create({
      ...createUserProductDto,
      userId: createUserProductDto.userId.toString(),
    });
  }

  async findAll(@Req() req) {
    return this.userProductRepo.find(req);
  }

  async findUserById(id: string): Promise<UserProduct[]> {
    return this.userProductRepo.findByUser(id);
  }

  async createWallet(id: string, createUserProductDto: CreateUserProductDto) {
    const user = await this.userRepo.findById(id);
    const riskTolerance = this.getPercentageByProfile(user.riskTolerance);

    console.log('user', user.currentPortfolioValue);
    console.log('riskTolerance', riskTolerance);

    const products = await this.getProducts();
    console.log('products', products);

    return createUserProductDto;
  }

  async getProducts() {
    return this.productRepo.find();
  }

  getPercentageByProfile(tolerance: string): Promise<any> {
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
