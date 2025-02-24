import { Injectable } from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserProductRepository } from './user-product.repository';

@Injectable()
export class UserProductsService {
  constructor(private userProductRepo: UserProductRepository) {}

  async create(
    createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    return await this.userProductRepo.create(createUserProductDto);
  }

  findAll() {
    return `This action returns all userProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProduct`;
  }

  update(id: number, updateUserProductDto: UpdateUserProductDto) {
    return `This action updates a #${id} ${updateUserProductDto} userProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProduct`;
  }
}
