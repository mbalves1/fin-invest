import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: Prisma.ProductCreateInput): Promise<any> {
    return await this.prisma.product.create({ data: body });
  }

  async find() {
    const product = await this.prisma.product.findMany();
    return product;
  }
}
