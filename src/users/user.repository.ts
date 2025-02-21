import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: Prisma.UserCreateInput): Promise<any> {
    return this.prisma.user.create({ data: body });
  }

  async find() {
    const user = await this.prisma.user.findMany();
    return user;
  }
}
