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

@Controller('user-products')
export class UserProductsController {
  constructor(private readonly userProductsService: UserProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    return await this.userProductsService.create(createUserProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.userProductsService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/invest/:id')
  findUserProducts(@Param('id') id: string) {
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
  @Get('sugestion/:id')
  async createWallet(
    @Param('id') id: string,
    @Body() createUserProductDto: CreateUserProductDto,
  ): Promise<any> {
    return this.userProductsService.createWallet(id, createUserProductDto);
  }
}
