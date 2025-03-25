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
  findUserProducts(@Req() req) {
    const id = req.user.id;
    console.log('id', id);

    return this.userProductsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/products/simulate')
  async createWallet(
    @Req() req,
    @Body() createUserProductDto: CreateUserProductDto,
  ): Promise<any> {
    // Promise<InvestmentResponse>
    const userId = req.user.id;
    return this.userProductsService.createWallet(userId, createUserProductDto);
  }

  @Post('/contract/:id')
  async createInvestmentsContract(
    @Param('id') id: string,
    @Body() createInvestmentProductDto: CreateInvestmentProductDto,
  ): Promise<any> {
    return this.userProductsService.createAnInvestments(
      id,
      createInvestmentProductDto,
    );
  }

  @Delete('/contract/:id')
  async deleteInvestmentContract(@Param('id') id: string) {
    return this.userProductsService.removeInvestment(+id);
  }
}
