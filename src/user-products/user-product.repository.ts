import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UserProduct } from 'src/types/userProductTypes';

@Injectable()
export class UserProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserProductDto): Promise<UserProduct> {
    const { userId, productId, quantity, ...purchaseData } = body;

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.quantityRemaining < quantity) {
      throw new BadRequestException('Quantity is not enough');
    }

    const userProduct = await this.prisma.userInvestments.create({
      data: {
        quantity,
        purchasedAt: purchaseData.purchasedAt,
        user: {
          connect: { id: String(userId) },
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

    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantityRemaining: product.quantityRemaining - quantity,
      },
    });

    return userProduct;
  }

  async find(@Req() req): Promise<UserProduct[]> {
    const userId = req.user.id;

    const product = await this.prisma.userInvestments.findMany({
      where: {
        userId,
      },
      include: {
        user: true, // Incluindo todos os dados do usuário
        product: true, // Incluindo todos os dados do produto
      },
    });
    return product;
  }

  async findByUser(id: string): Promise<UserProduct[]> {
    const product = await this.prisma.userInvestments.findMany({
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
