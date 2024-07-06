import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

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

  await app.listen(process.env.HOST!)
  console.log('Start server on:', process.env.HOST)
}
bootstrap()
