import { PrismaService } from 'src/prisma.service'

export class GetUserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async byEmail(email: string) {
    return await this.prisma.user.findMany({
      where: {
        email,
      },
    })
  }

  async byName(name: string) {
    return await this.prisma.user.findMany({
      where: {
        name,
      },
    })
  }
}
