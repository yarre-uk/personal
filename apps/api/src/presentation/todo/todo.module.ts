import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';

import {
  TODO_REPOSITORY_KEY,
  TODO_SERVICE_KEY,
  TodoService,
} from '~/application';
import { TodoRepository } from '~/infrastructure';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: TODO_SERVICE_KEY,
      useClass: TodoService,
    },
    {
      provide: TODO_REPOSITORY_KEY,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
