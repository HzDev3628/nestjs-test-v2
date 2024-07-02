import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

// export class GetUserDto {
//   email: 
// }

export class UserCreateDto {
  @ApiProperty({
    example: 'artem.khar5uk@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'HzDev',
    description: 'User name',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'password321',
    description: 'password for user',
  })
  @MinLength(4, {
    message: 'Min length need 4 symbol',
  })
  @IsString()
  password: string
}

export class UserType {
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  id: number

  @ApiProperty({
    example: 'artem.khar5uk@gmail.com',
    description: 'user email',
  })
  email: string

  @ApiProperty({
    example: 'HzDev',
    description: 'User name',
  })
  name: string

  @ApiProperty({
    example: 'password321',
    description: 'password for user',
  })
  password: string
}
