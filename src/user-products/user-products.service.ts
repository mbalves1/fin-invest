import { Injectable } from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserProductRepository } from './user-product.repository';
import { UserProduct } from 'src/types/userProductTypes';

@Injectable()
export class UserProductsService {
  constructor(private userProductRepo: UserProductRepository) {}

  async create(
    createUserProductDto: CreateUserProductDto,
  ): Promise<CreateUserProductDto> {
    return await this.userProductRepo.create(createUserProductDto);
  }

  async findAll() {
    return this.userProductRepo.find();
  }

  async findUserById(id: number): Promise<UserProduct[]> {
    return this.userProductRepo.findByUser(id);
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
