import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto, UserCreateDto, UserResponse } from './dto/auth.dto'
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

  @ApiOperation({ summary: 'Login user with jwt token' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @ApiOperation({ summary: 'Get new access token for jwt' })
  @ApiResponse({ status: 200, type: RefreshTokenResponse })
  @UsePipes(new ValidationPipe())
  @Post('login/:access-token')
  async getNewAccessToken(@Param() dto: RefreshTokenDto) {
    return this.authService.getNewAccessToken(dto.refreshToken)
  }
}
