import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import envConfig from '../env.validation'
import { TokenPayload } from '../types/jwt.type'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async signAccessToken(payload: { userId: number }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
      jwtid: crypto.randomUUID(),
    })
  }
  async signRefreshToken(payload: { userId: number }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
      jwtid: crypto.randomUUID(),
    })
  }
  async verifyAccessToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
    })
  }
  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    })
  }
}
