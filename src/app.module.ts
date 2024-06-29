import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TaskModule, UsersModule],
})
export class AppModule {}
