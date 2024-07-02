import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, UserCreateDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validationUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      ...tokens,
    }
  }

  async getNewAccessToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      ...tokens,
    }
  }

  async create(dto: UserCreateDto) {
    const [isEmailUsed, isNameUsed] = await Promise.all([
      await this.prisma.user.findMany({
        where: {
          email: dto.email,
        },
      }),
      await this.prisma.user.findMany({
        where: {
          name: dto.name,
        },
      }),
    ])

    if (isEmailUsed[0] || isNameUsed[0])
      throw new BadRequestException('This date ready used')

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      ...tokens,
    }
  }

  // @NOTE: Generate JWT token for auth
  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  private async validationUser(dto: LoginDto) {
    const user = await this.prisma.user.findMany({
      where: {
        email: dto.email,
      },
    })

    if (!user[0]) throw new NotFoundException('User not found')

    const isValid = await verify(user[0].password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user[0]
  }
}
