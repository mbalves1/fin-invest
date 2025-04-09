import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/types/userProductTypes';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { products, ...userData } = createUserDto;

    const existUser = await this.userRepo.findOneUser(createUserDto.email);

    if (existUser) {
      throw new ConflictException('E-mail already registered');
    }

    return await this.userRepo.create({
      ...userData,
      products: products
        ? {
            create: products.map((product) => ({
              productId: product.productId,
              investedAmount: product.quantity,
            })),
          }
        : undefined,
    });
  }

  async findAll(): Promise<any> {
    return await this.userRepo.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  findOne(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
