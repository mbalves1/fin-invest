import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from 'src/types/userProductTypes';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({ data: body });
  }

  async find(type?: string): Promise<Product[]> {
    const product = await this.prisma.product.findMany({
      where: type ? { investmentType: type } : {}, // 🔥 Mapeando `type` para `investmentType`
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
}
