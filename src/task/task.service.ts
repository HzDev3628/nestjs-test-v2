import { Injectable } from '@nestjs/common'
import { GetTasksDto, TaskDto } from './dto/task.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(dto: GetTasksDto) {
    const tasks = await this.prisma.user.findMany({
      where: {
        email: dto.email,
      },
      select: {
        tasks: true,
      },
    })

    return tasks[0].tasks
  }

  async create(dto: TaskDto) {
    const user = await this.prisma.user.findMany({
      where: {
        email: dto.userEmail,
      },
      select: {
        id: true,
      },
    })

    return await this.prisma.tasks.create({
      data: {
        createById: user[0].id,
        title: dto.title,
        description: dto.description,
      },
    })
  }
}
