import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UserCreateDto, UserType } from './dto/user-create.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: [UserType] })
  // @Get(@Body() dto: GetUserDto)
  @Get()
  async get() {
    return await this.usersService.get()
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: [UserType] })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: UserCreateDto) {
    return this.usersService.create(dto)
  }
}
