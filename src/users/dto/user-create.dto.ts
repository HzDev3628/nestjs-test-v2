import { IsEmail, IsString, MinLength } from 'class-validator'

export class UserCreateDto {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @MinLength(4, {
    message: 'Min length need 4 symbol',
  })
  @IsString()
  password: string
}
