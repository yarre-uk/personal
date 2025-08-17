import { Todo } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

import { TodoEntity } from '../../domain/entities/todo.entity';
import { TodoTitle } from '../../domain/value-objects';

export class TodoFactory {
  static createNew(title: string): TodoEntity {
    return new TodoEntity({
      id: uuidv7(),
      title: new TodoTitle(title),
    });
  }

  static fromPersistence(data: Todo): TodoEntity {
    return new TodoEntity({
      id: data.id,
      title: new TodoTitle(data.title),
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
