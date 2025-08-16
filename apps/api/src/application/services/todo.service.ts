import { Inject, Injectable } from '@nestjs/common';

import {
  ITodoFilters,
  ITodoRepository,
  ITodoService,
  TODO_REPOSITORY_KEY,
  TodoCreateDTO,
  TodoResponseDTO,
  TodoUpdateDTO,
  toTodoResponseDTO,
} from '../interfaces';

import { TodoEntity } from '~/domain';
import { TodoTitle } from '~/domain/value-objects';
import { TodoFactory } from '~/infrastructure';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject(TODO_REPOSITORY_KEY)
    private readonly todoRepository: ITodoRepository
  ) {}

  async findAll(): Promise<TodoResponseDTO[]> {
    const todos = await this.todoRepository.findAll();
    return todos.map((todo) => toTodoResponseDTO(todo));
  }

  async findById(id: string): Promise<TodoResponseDTO | null> {
    const todo = await this.todoRepository.findById(id);

    return todo ? toTodoResponseDTO(todo) : null;
  }

  async findByFilters(filters: ITodoFilters): Promise<TodoResponseDTO[]> {
    const todos = await this.todoRepository.findByFilters(filters);

    return todos.map((todo) => toTodoResponseDTO(todo));
  }

  async create(todo: TodoCreateDTO): Promise<TodoResponseDTO> {
    const todoEntity = TodoFactory.createNew(todo.title);

    const createdTodo = await this.todoRepository.create(todoEntity);
    return toTodoResponseDTO(createdTodo);
  }

  async update(todo: TodoUpdateDTO): Promise<TodoResponseDTO> {
    const todoEntity = new TodoEntity({
      id: todo.id,
      title: new TodoTitle(todo.title || ''),
    });

    const updatedTodo = await this.todoRepository.update(todoEntity);
    return toTodoResponseDTO(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
