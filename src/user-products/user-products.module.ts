import { Module } from '@nestjs/common';
import { UserProductsService } from './user-products.service';
import { UserProductsController } from './user-products.controller';
import { UserProductRepository } from './user-product.repository';
import { PrismaService } from 'prisma/prisma.service';
import { UserRepository } from 'src/users/user.repository';
import { ProductRepository } from 'src/products/product.repository';

@Module({
  controllers: [UserProductsController],
  providers: [
    UserProductRepository,
    UserProductsService,
    PrismaService,
    UserRepository,
    ProductRepository,
  ],
})
export class UserProductsModule {}
