import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';

import { PrismaService } from '@/data-access';
import { ITodoFilters, ITodoRepository } from '~/application/interfaces';
import { TodoEntity } from '~/domain';
import { TodoTitle } from '~/domain/value-objects';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TodoEntity[]> {
    const todos = await this.prisma.todo.findMany();

    return todos.map((todo) => this.mapToEntity(todo));
  }

  async findById(id: string): Promise<TodoEntity | null> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    return todo ? this.mapToEntity(todo) : null;
  }

  async findByFilters(filters: ITodoFilters): Promise<TodoEntity[]> {
    const { completed, title } = filters;

    const todos = await this.prisma.todo.findMany({
      where: {
        ...(completed !== undefined && { completed }),
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
      },
    });

    return todos.map((todo) => this.mapToEntity(todo));
  }

  async create(todo: TodoEntity): Promise<TodoEntity> {
    const createdTodo = await this.prisma.todo.create({
      data: {
        id: todo.getId(),
        title: todo.getTitle().getValue(),
        completed: todo.getCompleted(),
        createdAt: todo.getCreatedAt(),
        updatedAt: todo.getUpdatedAt(),
      },
    });

    return this.mapToEntity(createdTodo);
  }

  async update(todo: TodoEntity): Promise<TodoEntity> {
    const data = await this.prisma.todo.update({
      where: { id: todo.getId() },
      data: {
        title: todo.getTitle().getValue(),
        completed: todo.getCompleted(),
      },
    });

    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { id },
    });
  }

  private mapToEntity(data: Todo): TodoEntity {
    return new TodoEntity({
      id: data.id,
      title: new TodoTitle(data.title),
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
