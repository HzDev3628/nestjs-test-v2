import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [],
  providers: [],
  imports: [TaskModule, UsersModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
