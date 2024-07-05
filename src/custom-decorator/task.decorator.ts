import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

interface CustomDecoratorOptions {
  summary: string
  responseType: any
  statusCode: number
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE'
  endPoint: string
}

export function TaskDecorator(options: CustomDecoratorOptions) {
  return applyDecorators(
    ApiOperation({ summary: options.summary }),
    ApiResponse({ status: options.statusCode, type: options.responseType }),
    HttpCode(options.statusCode),
    options.method === 'GET'
      ? Get(options.endPoint)
      : options.method === 'POST'
        ? Post(options.endPoint)
        : options.method === 'PATCH'
          ? Patch(options.endPoint)
          : Delete(options.endPoint),
  )
}
