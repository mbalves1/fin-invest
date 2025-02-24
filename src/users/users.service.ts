import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { products, ...userData } = createUserDto;
    return await this.userRepo.create({
      ...userData,
      products: products
        ? {
            create: products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          }
        : undefined,
    });
  }

  async findAll(): Promise<any> {
    return await this.userRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
