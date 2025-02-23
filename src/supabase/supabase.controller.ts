import { Controller, Get, Param } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.supabaseService.getUserData(id);
  }
}
