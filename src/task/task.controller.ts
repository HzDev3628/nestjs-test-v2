import {
  Body,
  Controller,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  ChangeStatusOrDeleteDto,
  GetTasksDto,
  TaskDto,
  TasksType,
} from './dto/task.dto'
import { TaskService } from './task.service'
import { TaskDecorator } from '../custom-decorator/task.decorator'

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @TaskDecorator({
    summary: 'Get tasks by some user',
    statusCode: 200,
    responseType: [TasksType],
    method: 'GET',
    endPoint: '/:userId',
  })
  getAll(@Param() dto: GetTasksDto) {
    return this.taskService.getAll(dto)
  }

  @TaskDecorator({
    summary: 'Create Task',
    statusCode: 201,
    responseType: TasksType,
    method: 'POST',
    endPoint: 'create',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  }

  @TaskDecorator({
    summary: 'Change status task',
    statusCode: 201,
    responseType: TasksType,
    method: 'PATCH',
    endPoint: 'change-status',
  })
  @UsePipes(new ValidationPipe())
  async changeStatus(@Body() dto: ChangeStatusOrDeleteDto) {
    return await this.taskService.changeStatus(dto)
  }

  @TaskDecorator({
    summary: 'Delete task',
    statusCode: 204,
    responseType: TasksType,
    method: 'DELETE',
    endPoint: 'delete',
  })
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: ChangeStatusOrDeleteDto) {
    return await this.taskService.delete(dto)
  }
}
