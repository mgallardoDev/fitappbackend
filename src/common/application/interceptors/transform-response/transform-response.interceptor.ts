import { CallHandler, ExecutionContext, Global, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../api-responses/api.response';
import { Reflector } from '@nestjs/core';

@Injectable()
@Global()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        message: "aaaaaa",
          // this.reflector.get<string>(
          //   'response_message',
          //   context.getHandler(),
          // ) || '',
        metadata: data,
      })),
    );
  }
}