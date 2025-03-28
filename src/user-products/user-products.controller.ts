import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserProductsService } from './user-products.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInvestmentContractDto } from './dto/create-contract-user-product.dto';
import { CreateInvestmentProductDto } from './dto/create-investment-product.dto';

@Controller('investments')
export class UserProductsController {
  constructor(private readonly userProductsService: UserProductsService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('/invest')
  // findUserProducts(@Req() req) {
  //   const id = req.user.id;
  //   return this.userProductsService.findUserById(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/user/contracts')
  findUserProducts(@Req() req): Promise<CreateInvestmentProductDto[]> {
    const id = req.user.id;
    return this.userProductsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/products/simulate')
  async simulateWallet(
    @Req() req,
    @Body() createUserProductDto: CreateUserProductDto,
  ): Promise<any> {
    // Promise<InvestmentResponse>
    const userId = req.user.id;

    return this.userProductsService.simulateWallet(
      userId,
      createUserProductDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/contract')
  async createInvestmentsContract(
    @Req() req,
    @Body() createInvestmentContractDto: CreateInvestmentContractDto,
  ): Promise<CreateInvestmentContractDto> {
    const id = req.user.id;

    return this.userProductsService.createAnInvestments(
      id,
      createInvestmentContractDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('simple/contract')
  async createSimpleInvestmentsContract(
    @Req() req,
    @Body() createInvestmentProductDto: CreateInvestmentProductDto,
  ): Promise<CreateInvestmentProductDto> {
    const id = req.user.id;

    return this.userProductsService.createSimpleAnInvestment(
      id,
      createInvestmentProductDto,
    );
  }
}
