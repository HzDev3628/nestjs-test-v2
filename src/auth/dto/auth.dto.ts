import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class UserCreateDto {
  @ApiProperty({
    example: 'artem.khar5uk@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'HzDev',
    description: 'user name',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'password321',
    description: 'password for user account',
  })
  @MinLength(4, {
    message: 'Min length need 4 symbol',
  })
  @IsString()
  password: string
}

class UserType {
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
    description: 'user name',
  })
  name: string
}

class ResponseType {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5OTUwOTc5LCJleHAiOjE3MTk5NTQ1Nzl9.JwiNppmAN0ikdnHP9soXzH_0Pj82FpL-u595kjUJkow',
    description: 'access token',
  })
  accessToken: string
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5OTUwOTc5LCJleHAiOjE3MjA1NTU3Nzl9.MZYLlFTOcs6uHKqua2Paj2MR9VeDBbDi3TVwjKJyH5w',
    description: 'refresh token',
  })
  refreshToken: string
}

export class UserResponse {
  @ApiProperty({
    type: UserType,
    description: 'user data',
  })
  user: UserType

  @ApiProperty({
    type: ResponseType,
    description: 'tokens',
  })
  tokens: ResponseType
}

export class LoginDto {
  @ApiProperty({
    example: 'artem.khar5uk@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  email: string

  @MinLength(4, {
    message: 'Min length need 4 symbol',
  })
  @ApiProperty({
    example: 'password321',
    description: 'password for user account',
  })
  @IsString()
  password: string
}
