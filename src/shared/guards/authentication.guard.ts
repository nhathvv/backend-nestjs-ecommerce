import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthType, AuthTypeDecoratorPayload, ConditionGuard } from '../constants/auth.constant'
import { AUTH_DECORATOR_KEY } from '../decorators/auth.decorator'
import { AccessTokenGuard } from '../guards/access-token.guard'
import { APIKeyGuard } from '../guards/api-key.guard'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate>
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: APIKeyGuard
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.APIKey]: this.apiKeyGuard,
      [AuthType.None]: { canActivate: () => true }
    }
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(AUTH_DECORATOR_KEY, [
      context.getHandler(),
      context.getClass()
    ]) ?? {
      authType: [AuthType.None],
      options: { condition: ConditionGuard.AND }
    }
    const { authType, options } = metadata
    const guards = authType.map((item) => this.authTypeGuardMap[item])
    if (options?.condition === ConditionGuard.OR) {
      for (const instance of guards) {
        const canActivate = await Promise.resolve(instance.canActivate(context)).catch(() => {
          return false
        })
        if (canActivate) {
          return true
        }
      }
      throw new UnauthorizedException()
    } else {
      for (const instance of guards) {
        const canActivate = await Promise.resolve(instance.canActivate(context)).catch(() => {
          return false
        })
        if (!canActivate) {
          throw new UnauthorizedException()
        }
      }
      return true
    }
  }
}
