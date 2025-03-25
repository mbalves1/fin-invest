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
    const userId = req;

    const productFixedIncomeInvestment =
      await this.prisma.userInvestments.findMany({
        where: {
          userId,
        },
        include: {
          user: true, // Incluindo todos os dados do usuário
          FixedIncomeInvestment: true, // Incluindo todos os dados do produto
          RealEstateFund: true,
        },
      });

    return productFixedIncomeInvestment;
  }

  async findFixedIncomeProduct(productId: string) {
    try {
      const product = await this.prisma.fixedIncomeInvestment.findUnique({
        where: {
          id: String(productId),
        },
      });
      return product;
    } catch (error) {
      console.log('Error finding Fixed Income Product:', error);
      return null;
    }
  }

  async findRealEstateProduct(productId: string) {
    try {
      const product = await this.prisma.realEstateFund.findUnique({
        where: {
          id: String(productId),
        },
      });
      return product;
    } catch (error) {
      console.log('Error finding Real Estate Product:', error);
      return null;
    }
  }

  async createUserInvestment(
    userId: string,
    productId: string,
    quantity: number,
    purchasedAt: Date,
    productFixedIncome: any,
    productRealEstate: any,
  ) {
    let userProduct;

    // Verificando se o produto é de Renda Fixa
    if (productFixedIncome) {
      userProduct = await this.prisma.userInvestments.create({
        data: {
          quantity: quantity,
          purchasedAt: purchasedAt,
          user: {
            connect: { id: userId },
          },
          FixedIncomeInvestment: {
            connect: { id: productId },
          },
        },
        include: {
          user: true,
          FixedIncomeInvestment: true, // Inclui o produto de Renda Fixa
        },
      });
    }

    // Verificando se o produto é um Fundo Imobiliário
    else if (productRealEstate) {
      userProduct = await this.prisma.userInvestments.create({
        data: {
          quantity: quantity,
          purchasedAt: purchasedAt,
          user: {
            connect: { id: userId },
          },
          RealEstateFund: {
            connect: { id: productId },
          },
        },
        include: {
          user: true,
          RealEstateFund: true, // Inclui o Fundo Imobiliário
        },
      });
    }

    // Se nenhum dos tipos de produto for encontrado, lança um erro
    if (!userProduct) {
      throw new NotFoundException('Product type not found');
    }

    return userProduct;
  }

  async createAnInvestment(
    userId: string,
    body: CreateInvestmentProductDto,
  ): Promise<any> {
    const { productId, quantity, ...purchaseData } = body;

    // Buscar o produto de Renda Fixa
    const productFixedIncome = await this.findFixedIncomeProduct(
      String(productId),
    );

    // Buscar o produto de Fundo Imobiliário
    const productRealEstate = await this.findRealEstateProduct(
      String(productId),
    );

    // Verifica se ambos os produtos não foram encontrados
    if (!productFixedIncome && !productRealEstate) {
      throw new NotFoundException('Product not found');
    }

    // Cria o investimento do usuário
    const userProduct = await this.createUserInvestment(
      userId,
      String(productId),
      quantity,
      purchaseData.purchasedAt,
      productFixedIncome,
      productRealEstate,
    );

    return userProduct;
  }
}
