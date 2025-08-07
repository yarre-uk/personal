import { TodoEntity } from '~/domain';

export interface ITodoFilters {
  completed?: boolean;
  title?: string;
}

export interface ITodoRepository {
  findAll(): Promise<TodoEntity[]>;
  findById(id: number): Promise<TodoEntity | null>;
  findByFilters(filters: ITodoFilters): Promise<TodoEntity[]>;
  create(todo: TodoEntity): Promise<TodoEntity>;
  update(todo: TodoEntity): Promise<TodoEntity>;
  delete(id: number): Promise<void>;
}
