import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  // Some FN for regist user
  // {
  //    ...
  //  const tokens = await this.issueTokens(user.id)
  //  return {
  //    user, ...tokens
  //  }
  // }

  // @NOTE: Generate JWT token for auth
  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }
}
