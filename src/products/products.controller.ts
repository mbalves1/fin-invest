import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/types/userProductTypes';
import { CreateFixedIcomeProductDto } from './dto/create-fixed-income-product.dto';
import { FixedIncome } from 'src/types/responseFixedIncomeTypes';
import { StockTypes, StockTypesRequestBody } from 'src/types/stockTypes';
import {
  RealEstateTypes,
  RealEstateTypesRequestBody,
} from 'src/types/realEstateTypes';
import { CryptoTypes } from 'src/types/cryptoTypes';
import { CreateCryptocurrencyDto } from './dto/create-crypto-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('type') type?: string): Promise<Product[]> {
    return this.productsService.findAll(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  // Fixed Income
  @Get('finxed_income')
  getFixedIncome(): Promise<FixedIncome[]> {
    return this.productsService.findFixedIncome();
  }

  @Post('fixed_income')
  async createFixedIncome(
    @Body() createFixedIcomeProductDto: CreateFixedIcomeProductDto,
  ): Promise<FixedIncome> {
    return this.productsService.createFixedIncome(createFixedIcomeProductDto);
  }

  // Real Estate
  @Get('real_estate')
  async getRealEstate(): Promise<RealEstateTypes[]> {
    return this.productsService.findRealEstate();
  }

  @Post('real_estate')
  async createRealEstate(
    @Body() createRealEstateProductDto: RealEstateTypesRequestBody,
  ): Promise<any> {
    return this.productsService.createRealEstate(createRealEstateProductDto);
  }

  // Stocks
  @Get('stocks')
  async getStocks(): Promise<StockTypes[]> {
    return this.productsService.findStocks();
  }

  @Post('stocks')
  async createStocks(
    @Body() createStockProductDto: StockTypesRequestBody,
  ): Promise<StockTypes> {
    return this.productsService.createStocks(createStockProductDto);
  }

  // Crypto
  @Get('crypto')
  async getCrypto(): Promise<CryptoTypes[]> {
    return this.productsService.findCrypto();
  }

  @Post('crypto')
  async createCrypto(
    @Body() createCryptoProductDto: CreateCryptocurrencyDto,
  ): Promise<CryptoTypes> {
    return this.productsService.createCrypto(createCryptoProductDto);
  }

  // end Crypto

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }
}
