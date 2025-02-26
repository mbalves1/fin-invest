import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UserRepository,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { email, products, ...userData } = createUserDto;

    // Busca o usuário no Supabase pelo email (ou outra chave que você tenha)
    const supabaseUser = await this.supabaseService.getUserData(
      'a10223be-c92e-417c-8bdd-dd49669a8994',
    );

    console.log(supabaseUser.id);

    if (!supabaseUser) {
      throw new Error('Usuário não encontrado no Supabase');
    }

    // Adiciona o ID do Supabase ao DTO
    return await this.userRepo.create({
      ...userData,
      email,
      id: supabaseUser.id, // Adiciona o ID do Supabase
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
