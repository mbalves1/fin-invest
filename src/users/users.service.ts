import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

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
              quantity: product.quantity,
            })),
          }
        : undefined,
    });
  }

  async findAll(): Promise<any> {
    return await this.userRepo.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
