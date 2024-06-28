import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskDto } from './dto/task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.getAll()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  } 

  @Patch(':id')
  toggleStatus(@Param('id') id: string) {
    return this.taskService.toggleStatus(id)
  }
}
