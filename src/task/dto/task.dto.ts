import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class TaskDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsEmail()
  userEmail: string
}

export class GetTasksDto {
  @IsNumber()
  userId: number
}

export class ChangeStatusOrDelete {
  @IsNumber()
  taskId: number
}
