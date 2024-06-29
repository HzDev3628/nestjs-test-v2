import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserCreateDto } from './dto/user-create.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany()
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

    return await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password,
      },
    })
  }
}
