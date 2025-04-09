import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInvestmentProductDto } from './dto/create-investment-product.dto';
import { CreateInvestmentContractDto } from './dto/create-contract-user-product.dto';

interface InvestmentResponse {
  message: string;
  success: boolean;
  timestamp: Date;
}

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

  async findAllFixedIncome(): Promise<any> {
    try {
      const product = await this.prisma.fixedIncomeInvestment.findMany();
      return product;
    } catch (error) {
      console.log('Error finding Fixed Income Product:', error);
      return null;
    }
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

  async findAllRealEstate(): Promise<any> {
    try {
      const product = await this.prisma.realEstateFund.findMany();
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

  async findAllStocksProduct(): Promise<any> {
    try {
      const product = await this.prisma.stock.findMany();
      return product;
    } catch (error) {
      console.log('Error finding Fixed Income Product:', error);
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

  async findAllCryptoProduct(): Promise<any> {
    try {
      const product = await this.prisma.cryptocurrency.findMany();
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
    const { productId, investedAmount, ...body } = createInvestmentProductDto;

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
      investedAmount: investedAmount,
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

    // Get currentPorfolio from user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const currentPortfolioValue = user.currentPortfolioValue;
    const investedPortfolioValue = user.investedPortfolioValue;

    if (investedAmount > currentPortfolioValue - investedPortfolioValue) {
      throw new BadRequestException('Insufficient funds in portfolio');
    }

    // Altera o valor do investedPortfolioValue com valor do contrato
    const updateUserInvestedValue = await this.prisma.user.update({
      where: { id: userId },
      data: {
        investedPortfolioValue: investedAmount + investedPortfolioValue,
      },
    });

    console.log('>>', updateUserInvestedValue);

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

  async createAnInvestment(
    userId: string,
    body: CreateInvestmentContractDto,
  ): Promise<InvestmentResponse> {
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
    investmentEntries.map((item) => {
      const product = {
        productId: item[1].productId,
        investedAmount: item[1].investedAmount,
        userId: userId,
      };

      this.createSimpleInvestment(userId, product);
    });

    return {
      message: 'Contract done',
      success: true,
      timestamp: new Date(),
    };
  }

  async findInvestmentById(contractId: string): Promise<any> {
    return this.prisma.userInvestments.findUnique({
      where: {
        id: contractId,
      },
    });
  }

  async deleteInvestment(contractId: string): Promise<boolean> {
    const deletedContract = await this.prisma.userInvestments.delete({
      where: {
        id: contractId,
      },
    });

    if (deletedContract) {
      return true;
    } else {
      throw new NotFoundException('Investment not found');
    }
  }
}
