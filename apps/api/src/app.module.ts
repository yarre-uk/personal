import { Module } from '@nestjs/common';

import { TodoModule } from './presentation/todo/todo.module';

import { DataAccessModule } from '@/data-access';

@Module({
  imports: [DataAccessModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
