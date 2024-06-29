import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Task project')
    .setDescription('This documentation about REST API for task project')
    .setVersion('1.0.0')
    .addTag('End Points')
    .build()

  const documentation = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, documentation)

  await app.listen(4001)
}
bootstrap()
