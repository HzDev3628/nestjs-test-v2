import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
