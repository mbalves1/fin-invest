import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
})
export class UsersModule {}
