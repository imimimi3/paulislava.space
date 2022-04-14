import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AppRequest } from 'src/main'

export const RawBody = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest() as AppRequest
  const data = request.rawBody
  return data
})
