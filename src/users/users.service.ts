import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    console.log(createUserDto);
    return await this.userRepo.create(createUserDto);
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
