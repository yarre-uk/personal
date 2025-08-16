import { TodoEntity } from '~/domain';

export interface ITodoFilters {
  completed?: boolean;
  title?: string;
}

export const TODO_REPOSITORY_KEY = 'ITodoRepository';

export interface ITodoRepository {
  findAll(): Promise<TodoEntity[]>;
  findById(id: string): Promise<TodoEntity | null>;
  findByFilters(filters: ITodoFilters): Promise<TodoEntity[]>;
  create(todo: TodoEntity): Promise<TodoEntity>;
  update(todo: TodoEntity): Promise<TodoEntity>;
  delete(id: string): Promise<void>;
}
