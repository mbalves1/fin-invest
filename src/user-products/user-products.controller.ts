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

@Controller('investments')
export class UserProductsController {
  constructor(private readonly userProductsService: UserProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    const userId = req.user.id;
    return await this.userProductsService.create(userId, createUserProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.userProductsService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/invest')
  findUserProducts(@Req() req) {
    const id = req.user.id;
    return this.userProductsService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProductsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProductDto: UpdateUserProductDto,
  ) {
    return this.userProductsService.update(+id, updateUserProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProductsService.remove(+id);
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

  @UseGuards(JwtAuthGuard)
  @Post('/contract/confirm')
  async createInvestments(
    @Req() req,
    @Body() createInvestmentContractDto: CreateInvestmentContractDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.userProductsService.createInvestments(
      userId,
      createInvestmentContractDto,
    );
  }
}
