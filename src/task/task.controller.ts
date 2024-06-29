import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { GetTasksDto, TaskDto } from './dto/task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(@Body() dto: GetTasksDto) {
    return this.taskService.getAll(dto)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  }
}
