import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from 'src/types/userProductTypes';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: Prisma.UserCreateInput): Promise<any> {
    const existUserById = await this.prisma.user.findUnique({
      where: { id: body.id },
    });

    if (existUserById) {
      throw new ConflictException('Usuário com esse ID já existe');
    }

    // Verifica se o e-mail já existe
    const existUserByEmail = await this.findOneUser(body.email);

    if (existUserByEmail) {
      throw new ConflictException('E-mail já registrado');
    }

    return this.prisma.user.create({ data: body });
  }

  async find() {
    const user = await this.prisma.user.findMany();
    return user;
  }

  async findOneUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException('E-mail already registered');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { products, ...userData } = updateUserDto; // Desestruture para pegar os dados do usuário e excluir products

    console.log(products);

    return await this.prisma.user.update({
      where: {
        id, // Encontrar o usuário pelo ID
      },
      data: {
        ...userData, // Atualizar todos os dados do usuário, exceto os produtos
      },
    });
  }

  async findByIdMe(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    return user;
  }
}
