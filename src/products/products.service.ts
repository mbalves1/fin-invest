import { CreateCryptocurrencyDto } from './dto/create-crypto-product.dto';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from 'src/types/userProductTypes';
import { CreateFixedIcomeProductDto } from './dto/create-fixed-income-product.dto';
import { FixedIncome } from 'src/types/responseFixedIncomeTypes';
import { CreateRealEstateFundDto } from './dto/create-real-estate-fund-product.dto';
import { StockTypes } from 'src/types/stockTypes';
import { RealEstateTypes } from 'src/types/realEstateTypes';
import { CryptoTypes } from 'src/types/cryptoTypes';
import { CreateStockDto } from './dto/create-stocks-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepo: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepo.create(createProductDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'Dados inválidos. Verifique os campos enviados.',
        );
      }
    }
  }

  async findAll(type?: string): Promise<Product[]> {
    return this.productRepo.find(type);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepo.update(id, updateProductDto);
  }

  // Fixed Income
  async findFixedIncome(): Promise<FixedIncome[]> {
    const fixedIncome = await this.productRepo.findFixedIncome();
    if (!fixedIncome) {
      throw new NotFoundException('No product found.');
    }
    return fixedIncome;
  }

  async createFixedIncome(
    createFixedIcomeProductDto: CreateFixedIcomeProductDto,
  ): Promise<FixedIncome> {
    const fixedIncome = await this.productRepo.createFixedIncome(
      createFixedIcomeProductDto,
    );
    return fixedIncome;
  }

  // Real Estate
  async findRealEstate(): Promise<RealEstateTypes[]> {
    const realEstate = await this.productRepo.findRealEstate();
    if (!realEstate) {
      throw new NotFoundException('No product found.');
    }
    return realEstate;
  }

  async createRealEstate(
    createRealEstateFundDto: CreateRealEstateFundDto,
  ): Promise<RealEstateTypes> {
    const realEstate = await this.productRepo.createRealEstate(
      createRealEstateFundDto,
    );
    return realEstate;
  }

  // Stocks
  async findStocks(): Promise<StockTypes[]> {
    const stocks = await this.productRepo.findStock();
    if (!stocks) {
      throw new NotFoundException('No product found.');
    }
    return stocks;
  }

  async createStocks(createStockDto: CreateStockDto): Promise<StockTypes> {
    return this.productRepo.createStock(createStockDto);
  }

  // Crypto
  async findCrypto(): Promise<CryptoTypes[]> {
    const crypto = await this.productRepo.findCrypto();
    if (!crypto) {
      throw new NotFoundException('No product found.');
    }
    return crypto;
  }

  async createCrypto(
    createCryptocurrencyDto: CreateCryptocurrencyDto,
  ): Promise<CryptoTypes> {
    return this.productRepo.createCrypto(createCryptocurrencyDto);
  }
}
