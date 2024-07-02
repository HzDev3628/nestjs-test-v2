import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5OTUwOTc5LCJleHAiOjE3MTk5NTQ1Nzl9.JwiNppmAN0ikdnHP9soXzH_0Pj82FpL-u595kjUJkow',
    description: 'old refresh token',
  })
  @IsString()
  refreshToken: string
}

export class RefreshTokenResponse {
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
