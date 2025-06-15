import { SetMetadata } from '@nestjs/common'
import { AuthTypeValue, ConditionGuard, ConditionGuardType } from '../constants/auth.constant'

export const AUTH_DECORATOR_KEY = 'Auth'
export const Auth = (authType: AuthTypeValue[], options?: { condition: ConditionGuardType }) => {
  return SetMetadata(AUTH_DECORATOR_KEY, {
    authType,
    options: options ?? { condition: ConditionGuard.AND }
  })
}
