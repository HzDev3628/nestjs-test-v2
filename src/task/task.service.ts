import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ChangeStatusOrDelete, GetTasksDto, TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(dto: GetTasksDto) {
    const tasks = await this.prisma.user.findMany({
      where: {
        id: Number(dto.userId),
      },
      select: {
        tasks: true,
      },
    })

    return tasks[0].tasks[0]
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

  async changeStatus(dto: ChangeStatusOrDelete) {
    return await this.prisma.tasks.update({
      where: {
        id: dto.taskId,
      },
      data: {
        isDone: true,
      },
    })
  }

  async delete(dto: ChangeStatusOrDelete) {
    await this.prisma.tasks.delete({
      where: {
        id: dto.taskId,
      },
    })

    return { ok: true }
  }
}
