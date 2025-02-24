import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';

@Injectable()
export class UserProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserProductDto) {
    const { userId, productId, ...purchaseData } = body;

    return await this.prisma.userProduct.create({
      data: {
        quantity: purchaseData.quantity,
        purchasedAt: purchaseData.purchasedAt,
        user: {
          connect: { id: userId },
        },
        product: {
          connect: { id: productId },
        },
      },
      include: {
        user: true, // Incluindo todos os dados do usuário
        product: true, // Incluindo todos os dados do produto
      },
    });
  }

  async find() {
    const product = await this.prisma.product.findMany();
    return product;
  }
}
