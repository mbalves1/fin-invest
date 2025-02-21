import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Para carregar variáveis do arquivo .env
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ProductsModule],
})
export class AppModule {}
