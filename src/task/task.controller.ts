import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { ChangeStatusOrDelete, GetTasksDto, TaskDto } from './dto/task.dto'

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

  @Patch('change-status')
  @UsePipes(new ValidationPipe())
  async changeStatus(@Body() dto: ChangeStatusOrDelete) {
    return await this.taskService.changeStatus(dto)
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: ChangeStatusOrDelete) {
    return await this.taskService.delete(dto)
  }
}
