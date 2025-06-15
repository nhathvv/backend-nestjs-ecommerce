export const REQUEST_USER_KEY = 'user'
export const AuthType = {
  Bearer: 'Bearer',
  APIKey: 'APIKey',
  None: 'None',
} as const
export type AuthTypeValue = (typeof AuthType)[keyof typeof AuthType]
export const ConditionGuard = {
  AND: 'AND',
  OR: 'OR',
} as const
export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard]
export type AuthTypeDecoratorPayload = {
  authType: AuthTypeValue[]
  options?: { condition: ConditionGuardType }
}
