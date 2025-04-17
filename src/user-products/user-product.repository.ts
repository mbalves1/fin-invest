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

  async createInvestment(data: any): Promise<any> {
    const mm = await this.prisma.userInvestments.create({
      data,
      include: {
        user: true,
        FixedIncomeInvestment: true,
        RealEstateFund: true,
        Stock: true,
        Cryptocurrency: true,
      },
    });
    console.log('Investment', mm);

    return mm;
  }

  async findProductById(productId: string): Promise<any> {
    // Busca em todas as tabelas
    const fixedIncome = await this.prisma.fixedIncomeInvestment.findUnique({
      where: { id: productId },
    });

    if (fixedIncome)
      return { type: 'FixedIncomeInvestment', data: fixedIncome };

    const realEstateFund = await this.prisma.realEstateFund.findUnique({
      where: { id: productId },
    });

    if (realEstateFund) return { type: 'RealEstateFund', data: realEstateFund };

    // Verificações para demais produtos...
    const stock = await this.prisma.stock.findUnique({
      where: { id: productId },
    });

    if (stock) return { type: 'Stock', data: stock };

    const cryptocurrency = await this.prisma.cryptocurrency.findUnique({
      where: { id: productId },
    });

    if (cryptocurrency) return { type: 'Cryptocurrency', data: cryptocurrency };

    return null;
  }

  async getUserById(userId: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUserInvestedValue(
    userId: string,
    newValue: number,
  ): Promise<any> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        investedPortfolioValue: newValue,
      },
    });
  }

  // async createAnInvestment(
  //   userId: string,
  //   body: CreateInvestmentContractDto,
  // ): Promise<InvestmentResponse> {
  //   // Buscar o produto de Renda Fixa
  //   const fixedIncome = await this.prisma.fixedIncomeInvestment.findUnique({
  //     where: { id: String(body?.fixed_income?.productId) },
  //   });

  //   const realEstateFund = await this.prisma.realEstateFund.findUnique({
  //     where: { id: String(body?.real_state?.productId) },
  //   });

  //   const stock = await this.prisma.stock.findUnique({
  //     where: { id: String(body?.stock?.productId) },
  //   });

  //   const cryptocurrency = await this.prisma.cryptocurrency.findUnique({
  //     where: { id: String(body?.crypto?.productId) },
  //   });

  //   // Se não encontrar o produto em nenhuma tabela, lança um erro
  //   if (!fixedIncome && !realEstateFund && !stock && !cryptocurrency) {
  //     throw new NotFoundException('Product not found!...');
  //   }

  //   const investmentEntries = Object.entries(body);
  //   investmentEntries.map((item) => {
  //     const product = {
  //       productId: String(item[1].productId),
  //       investedAmount: item[1].investedAmount,
  //       userId: userId,
  //     };

  //     console.log('Product:', typeof String(item[1].productId));

  //     this.createInvestment(product);
  //   });

  //   return {
  //     message: 'Contract done',
  //     success: true,
  //     timestamp: new Date(),
  //   };
  // }

  async findFixedIncomeById(id: string) {
    return this.prisma.fixedIncomeInvestment.findUnique({
      where: { id },
    });
  }

  async findRealEstateFundById(id: string) {
    return this.prisma.realEstateFund.findUnique({
      where: { id },
    });
  }

  async findStockById(id: string) {
    return this.prisma.stock.findUnique({
      where: { id },
    });
  }

  async findCryptocurrencyById(id: string) {
    return this.prisma.cryptocurrency.findUnique({
      where: { id },
    });
  }

  async createGroupInvestment(investmentData: any): Promise<any> {
    return this.prisma.userInvestments.create({
      data: investmentData,
    });
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
