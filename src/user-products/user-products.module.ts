import { Module } from '@nestjs/common';
import { UserProductsService } from './user-products.service';
import { UserProductsController } from './user-products.controller';
import { UserProductRepository } from './user-product.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UserProductsController],
  providers: [UserProductRepository, UserProductsService, PrismaService],
})
export class UserProductsModule {}
