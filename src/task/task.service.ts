import { Injectable } from '@nestjs/common'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
  private TASKS = [
    {
      id: 1,
      title: 'Create a new project',
      isDone: false,
    },
  ]

  getAll() {
    return this.TASKS
  }

  create(dto: TaskDto) {
    this.TASKS.push({
      id: this.TASKS.length + 1,
      title: dto.title,
      isDone: false,
    })

    return this.TASKS
  }

  toggleStatus(id: string) {
    this.TASKS.find((v) => v.id === +id).isDone = true
    return this.TASKS
  }
}
