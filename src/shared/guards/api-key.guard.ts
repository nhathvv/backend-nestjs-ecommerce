import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import envConfig from '../env.validation'

@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const xApiKey = request.headers['x-api-key']
    if (xApiKey !== envConfig.SECRET_API_KEY) {
      throw new UnauthorizedException()
    }
    return true
  }
}
