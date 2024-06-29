import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UserCreateDto } from './dto/user-create.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: UserCreateDto) {
    return this.usersService.create(dto)
  }
}
