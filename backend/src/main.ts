import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as bodyParser from 'body-parser'
import { Encoding } from 'crypto'
import { IncomingMessage, ServerResponse } from 'http'

export interface AppRequest extends IncomingMessage {
  rawBody?: string
}

const rawBodyBuffer = (
  req: AppRequest,
  _res: ServerResponse,
  buffer: Buffer,
  encoding: Encoding
): void => {
  if (buffer && buffer.length) {
    req.rawBody = buffer.toString(encoding || 'utf8')
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false })

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }))
  app.use(bodyParser.json({ verify: rawBodyBuffer }))
  await app.listen(4000)
}
bootstrap()
