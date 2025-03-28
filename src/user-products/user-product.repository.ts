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
import { Prisma } from '@prisma/client';
import { CreateInvestmentContractDto } from './dto/create-contract-user-product.dto';

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

    return await this.prisma.userInvestments.findMany({
      where: {
        userId,
      },
      include: {
        user: true, // Incluindo todos os dados do usuário
        FixedIncomeInvestment: true, // Incluindo todos os dados do produto
        RealEstateFund: true,
        Stock: true,
        Cryptocurrency: true,
      },
    });
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

  async findStocksProduct(productId: string) {
    try {
      const product = await this.prisma.stock.findUnique({
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

  async findCryptoProduct(productId: string) {
    try {
      const product = await this.prisma.cryptocurrency.findUnique({
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

  async createSimpleInvestment(
    userId: string,
    createInvestmentProductDto: CreateInvestmentProductDto,
  ): Promise<CreateInvestmentProductDto> {
    const { productId, quantity, ...body } = createInvestmentProductDto;

    // Verifica se o produto existe em uma das tabelas
    const fixedIncome = await this.prisma.fixedIncomeInvestment.findUnique({
      where: { id: String(productId) },
    });

    const realEstateFund = await this.prisma.realEstateFund.findUnique({
      where: { id: String(productId) },
    });

    const stock = await this.prisma.stock.findUnique({
      where: { id: String(productId) },
    });

    const cryptocurrency = await this.prisma.cryptocurrency.findUnique({
      where: { id: String(productId) },
    });

    // Se não encontrar o produto em nenhuma tabela, lança um erro
    if (!fixedIncome && !realEstateFund && !stock && !cryptocurrency) {
      throw new NotFoundException('Product not found!');
    }

    // Monta o objeto de conexão dinamicamente
    const investmentData: any = {
      quantity: quantity,
      purchasedAt: body.purchasedAt,
      user: {
        connect: { id: userId },
      },
    };

    if (fixedIncome) {
      investmentData.FixedIncomeInvestment = { connect: { id: productId } };
    } else if (realEstateFund) {
      investmentData.RealEstateFund = { connect: { id: productId } };
    } else if (stock) {
      investmentData.Stock = { connect: { id: productId } };
    } else if (cryptocurrency) {
      investmentData.Cryptocurrency = { connect: { id: productId } };
    }

    // Cria o investimento apenas na tabela correspondente
    return await this.prisma.userInvestments.create({
      data: investmentData,
      include: {
        user: true,
        FixedIncomeInvestment: true,
        RealEstateFund: true,
        Stock: true,
        Cryptocurrency: true,
      },
    });
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
    body: CreateInvestmentContractDto,
  ): Promise<any> {
    console.log('userId', userId);

    // Buscar o produto de Renda Fixa
    const fixedIncome = await this.prisma.fixedIncomeInvestment.findUnique({
      where: { id: String(body?.fixed_income?.productId) },
    });

    const realEstateFund = await this.prisma.realEstateFund.findUnique({
      where: { id: String(body?.real_state?.productId) },
    });

    const stock = await this.prisma.stock.findUnique({
      where: { id: String(body?.stock?.productId) },
    });

    const cryptocurrency = await this.prisma.cryptocurrency.findUnique({
      where: { id: String(body?.crypto?.productId) },
    });

    // Se não encontrar o produto em nenhuma tabela, lança um erro
    if (!fixedIncome && !realEstateFund && !stock && !cryptocurrency) {
      throw new NotFoundException('Product not found!...');
    }

    const investmentEntries = Object.entries(body);
    console.log(investmentEntries);

    // Mapeia os investimentos para inserção no banco

    return;
  }
}
