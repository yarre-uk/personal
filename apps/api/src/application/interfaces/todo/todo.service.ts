import { TodoCreateDTO, TodoResponseDTO, TodoUpdateDTO } from './todo.dto';
import { ITodoFilters } from './todo.repository';

export const TODO_SERVICE_KEY = 'ITodoService';

export interface ITodoService {
  findAll(): Promise<TodoResponseDTO[]>;
  findById(id: number): Promise<TodoResponseDTO | null>;
  findByFilters(filters: ITodoFilters): Promise<TodoResponseDTO[]>;
  create(todo: TodoCreateDTO): Promise<TodoResponseDTO>;
  update(todo: TodoUpdateDTO): Promise<TodoResponseDTO>;
  delete(id: number): Promise<void>;
}
