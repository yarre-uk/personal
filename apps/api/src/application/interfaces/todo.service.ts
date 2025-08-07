import { ITodoFilters } from './todo.repository';

import { TodoEntity } from '~/domain';

export interface ITodoService {
  findAll(): Promise<TodoEntity[]>;
  findById(id: number): Promise<TodoEntity | null>;
  findByFilters(filters: ITodoFilters): Promise<TodoEntity[]>;
  create(todo: Pick<TodoEntity, 'title'>): Promise<TodoEntity>;
  delete(id: number): Promise<void>;
  update(todo: Partial<TodoEntity>): Promise<TodoEntity>;
}
