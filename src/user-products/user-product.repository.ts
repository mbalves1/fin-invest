import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UserProduct } from 'src/types/userProductTypes';
import { CreateInvestmentProductDto } from './dto/create-investment-product.dto';

@Injectable()
export class UserProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  // async findByUser(id: string): Promise<UserProduct[]> {
  //   const product = await this.prisma.userInvestments.findMany({
  //     where: {
  //       userId: id,
  //     },
  //     include: {
  //       user: true,
  //       product: true,
  //     },
  //   });

  //   return product;
  // }

  async find(@Req() req): Promise<CreateInvestmentProductDto[]> {
    console.log('req...', req);
    const userId = req;

    const productFixedIncomeInvestment =
      await this.prisma.userInvestments.findMany({
        where: {
          userId,
        },
        include: {
          user: true, // Incluindo todos os dados do usuário
          FixedIncomeInvestment: true, // Incluindo todos os dados do produto
        },
      });

    console.log(productFixedIncomeInvestment);

    return productFixedIncomeInvestment;
  }

  async createAnInvestment(
    userId: string,
    body: CreateInvestmentProductDto,
  ): Promise<CreateInvestmentProductDto> {
    const { productId, quantity, ...purchaseData } = body;
    console.log('productId', productId);
    console.log('userId', userId);
    console.log('Product ID:', productId, typeof productId);

    // buscar o produto por id em cada uma dos repositories
    const productFixedIncome =
      await this.prisma.fixedIncomeInvestment.findUnique({
        where: {
          id: String(productId),
        },
      });

    if (!productFixedIncome) {
      throw new NotFoundException('Product not found');
    }

    const userProduct = await this.prisma.userInvestments.create({
      data: {
        quantity: quantity,
        purchasedAt: purchaseData.purchasedAt,
        user: {
          connect: { id: userId },
        },
        FixedIncomeInvestment: {
          connect: { id: String(productId) },
        },
      },
      include: {
        user: true, // Incluindo todos os dados do usuário
        FixedIncomeInvestment: true, // Incluindo todos os dados do produto
      },
    });

    // await this.prisma.product.update({
    //   where: {
    //     id: productId,
    //   },
    //   data: {
    //     quantityRemaining: productFixedIncome.quantityRemaining - quantity,
    //   },
    // });

    console.log(body);
    return userProduct;
  }

  async removeInvestment(productId: number): Promise<any> {
    const productFixedIncome =
      await this.prisma.fixedIncomeInvestment.findUnique({
        where: {
          id: String(productId),
        },
      });

    if (!productFixedIncome) {
      throw new NotFoundException('Product not found');
    }
    // Implementar a lógica para remover investimentos
  }
}
