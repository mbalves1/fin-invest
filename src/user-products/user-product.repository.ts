import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UserProduct } from 'src/types/userProductTypes';

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

  async find(): Promise<UserProduct[]> {
    const product = await this.prisma.userProduct.findMany({
      include: {
        user: true, // Incluindo todos os dados do usuário
        product: true, // Incluindo todos os dados do produto
      },
    });
    return product;
  }

  async findByUser(id: number): Promise<UserProduct[]> {
    const product = await this.prisma.userProduct.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        product: true,
      },
    });

    return product;
  }
}
