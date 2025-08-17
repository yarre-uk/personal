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

import { isDefined } from '@/shared';
import { TodoNotFoundException } from '~/domain/exceptions';
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

    if (!isDefined(todo)) {
      throw new TodoNotFoundException(id);
    }

    return toTodoResponseDTO(todo);
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
    const existingTodo = await this.todoRepository.findById(todo.id);

    if (!isDefined(existingTodo)) {
      throw new TodoNotFoundException(todo.id);
    }

    if (todo.title) {
      existingTodo.updateTitle(new TodoTitle(todo.title));
    }

    if (todo.completed !== undefined) {
      if (todo.completed) {
        existingTodo.markAsCompleted();
      } else {
        existingTodo.markAsIncomplete();
      }
    }

    const updatedTodo = await this.todoRepository.update(existingTodo);
    return toTodoResponseDTO(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);

    if (!isDefined(todo)) {
      throw new TodoNotFoundException(id);
    }

    return this.todoRepository.delete(id);
  }
}
