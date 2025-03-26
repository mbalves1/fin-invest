import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from 'src/types/userProductTypes';
import { UpdateProductDto } from './dto/update-product.dto';
import { FixedIncome } from 'src/types/responseFixedIncomeTypes';
import { StockTypes } from 'src/types/stockTypes';
import { RealEstateTypes } from 'src/types/realEstateTypes';

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
  async findRealEstate(): Promise<RealEstateTypes[]> {
    return this.prisma.realEstateFund.findMany({});
  }

  async createRealEstate(
    body: Prisma.RealEstateFundCreateInput,
  ): Promise<RealEstateTypes> {
    const existingFund = await this.prisma.realEstateFund.findUnique({
      where: { ticker: body.ticker },
    });

    if (existingFund) {
      throw new ConflictException(
        `A real estate fund with this ticker already exists ${body.ticker}`,
      );
    }

    return this.prisma.realEstateFund.create({
      data: body,
    });
  }

  // Stock
  async findStock(): Promise<StockTypes[]> {
    return this.prisma.stock.findMany({});
  }

  async createStock(body: Prisma.StockCreateInput): Promise<StockTypes> {
    const existStock = await this.prisma.stock.findUnique({
      where: { ticker: body.ticker },
    });

    if (existStock) {
      throw new ConflictException(
        `A stock with this ticker already exists ${body.ticker}`,
      );
    }

    return this.prisma.stock.create({ data: body });
  }
}
