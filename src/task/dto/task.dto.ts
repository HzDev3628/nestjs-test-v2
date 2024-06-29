import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class TaskDto {
  @ApiProperty({
    example: 'Claim token today on 10 PM',
    description: 'title task',
  })
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    example: 'artem.khar5uk@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  userEmail: string
}

export class GetTasksDto {
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @IsNumber()
  userId: number
}

export class ChangeStatusOrDelete {
  @ApiProperty({
    example: 1,
    description: 'task id',
  })
  @IsNumber()
  taskId: number
}

export class TasksType {
  @ApiProperty({
    example: 1,
    description: 'task id',
  })
  id: number

  @ApiProperty({
    example: 2,
    description: 'id user relation this task',
  })
  createById: number

  @ApiProperty({
    example: '2024-06-29T09:29:50.765Z',
    description: 'create date',
  })
  createAt: string

  @ApiProperty({
    example: '2024-06-29T12:00:29.081Z',
    description: 'update date task',
  })
  updateAt: string

  @ApiProperty({
    example: 'Claim token today on 10 PM',
    description: 'title task',
  })
  title: string

  @ApiProperty({
    example: '1000 token from Blum',
    description: 'description task',
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    example: false,
    description: 'status task',
  })
  isDone: boolean
}

export class DeleteTaskType {
  @ApiProperty({
    example: true,
    description: 'Status code',
  })
  ok: boolean
}
