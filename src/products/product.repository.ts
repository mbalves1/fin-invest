import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from 'src/types/userProductTypes';
import { UpdateProductDto } from './dto/update-product.dto';
import { FixedIncome } from 'src/types/responseFixedIncomeTypes';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({ data: body });
  }

  async find(type?: string): Promise<Product[]> {
    const product = await this.prisma.product.findMany({
      where: type ? { investmentType: type } : {}, // 🔥 Mapeando `type` para `investmentType`
      orderBy: { rate: 'desc' },
    });
    return product;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
      },
    });
  }

  // Fixed Income
  async findFixedIncome(): Promise<FixedIncome[]> {
    console.log('Fetching fixed income investments...');

    const fixedIncome = await this.prisma.fixedIncomeInvestment.findMany({});
    return fixedIncome;
  }

  async createFixedIncome(
    body: Prisma.FixedIncomeInvestmentCreateInput,
  ): Promise<FixedIncome> {
    return await this.prisma.fixedIncomeInvestment.create({ data: body });
  }

  // Real Estate
  async findRealEstate(): Promise<any> {
    console.log('Fetching real estate investments...');

    const realEstate = await this.prisma.realEstateFund.findMany({});
    return realEstate;
  }

  async createRealEstate(body: Prisma.RealEstateFundCreateInput): Promise<any> {
    console.log('Creating real estate investment...');
    return await this.prisma.realEstateFund.create({
      data: body,
    });
  }
}
