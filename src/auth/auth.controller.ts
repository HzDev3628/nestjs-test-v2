import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  LoginDto,
  ResponseType,
  UserCreateDto,
  UserResponse,
} from './dto/auth.dto'
import { RefreshTokenDto, RefreshTokenResponse } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  async create(@Body() dto: UserCreateDto) {
    return this.authService.create(dto)
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @ApiOperation({ summary: 'Get new access token' })
  @ApiResponse({ status: 200, type: RefreshTokenResponse })
  @UsePipes(new ValidationPipe())
  @Post('login/access-token')
  async getNewAccessToken(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewAccessToken(dto.refreshToken)
  }
}
