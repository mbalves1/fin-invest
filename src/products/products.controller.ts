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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  // Fixed Income
  @Get('finxed_income/fixed')
  getFixedIncome(): Promise<FixedIncome[]> {
    return this.productsService.findFixedIncome();
  }

  @Post('fixed_income')
  async createFixedIncome(
    @Body() createFixedIcomeProductDto: CreateFixedIcomeProductDto,
  ): Promise<FixedIncome> {
    return this.productsService.createFixedIncome(createFixedIcomeProductDto);
  }
}
