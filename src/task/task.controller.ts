import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ChangeStatusOrDeleteDto,
  DeleteTaskType,
  GetTasksDto,
  TaskDto,
  TasksType,
} from './dto/task.dto'
import { TaskService } from './task.service'

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get tasks by some user' })
  @ApiResponse({ status: 200, type: [TasksType] })
  @HttpCode(200)
  @Get('/:userId')
  getAll(@Param() dto: GetTasksDto) {
    return this.taskService.getAll(dto)
  }

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({ status: 200, type: TasksType })
  @HttpCode(200)
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  }

  @ApiOperation({ summary: 'Change status task' })
  @ApiResponse({ status: 200, type: TasksType })
  @HttpCode(200)
  @Patch('change-status')
  @UsePipes(new ValidationPipe())
  async changeStatus(@Body() dto: ChangeStatusOrDeleteDto) {
    return await this.taskService.changeStatus(dto)
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, type: DeleteTaskType })
  @HttpCode(200)
  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: ChangeStatusOrDeleteDto) {
    return await this.taskService.delete(dto)
  }
}
