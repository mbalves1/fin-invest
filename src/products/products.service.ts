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

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
