import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ClassSerializerInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
  statusCode: number
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const statusCode = response.statusCode
    const serializerInterceptor = new ClassSerializerInterceptor(this.reflector)
    const transformed = serializerInterceptor.intercept(context, next)
    return transformed.pipe(map((data) => ({ data, statusCode })))
  }
}
