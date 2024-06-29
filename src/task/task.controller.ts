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
import {
  ChangeStatusOrDelete,
  DeleteTaskType,
  GetTasksDto,
  TaskDto,
  TasksType,
} from './dto/task.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get tasks by some user' })
  @ApiResponse({ status: 200, type: [TasksType] })
  @Get()
  getAll(@Body() dto: GetTasksDto) {
    return this.taskService.getAll(dto)
  }

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({ status: 200, type: TasksType })
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  }

  @ApiOperation({ summary: 'Change status task' })
  @ApiResponse({ status: 200, type: TasksType })
  @Patch('change-status')
  @UsePipes(new ValidationPipe())
  async changeStatus(@Body() dto: ChangeStatusOrDelete) {
    return await this.taskService.changeStatus(dto)
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, type: DeleteTaskType })
  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: ChangeStatusOrDelete) {
    return await this.taskService.delete(dto)
  }
}
