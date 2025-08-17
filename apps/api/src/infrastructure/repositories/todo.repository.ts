import { Injectable } from '@nestjs/common';

import { TodoFactory } from './todo.factory';

import { PrismaService } from '@/data-access';
import { ITodoFilters, ITodoRepository } from '~/application/interfaces';
import { TodoEntity } from '~/domain';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TodoEntity[]> {
    const todos = await this.prisma.todo.findMany();

    return todos.map((todo) => TodoFactory.fromPersistence(todo));
  }

  async findById(id: string): Promise<TodoEntity | null> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    return todo ? TodoFactory.fromPersistence(todo) : null;
  }

  async findByFilters(filters: ITodoFilters): Promise<TodoEntity[]> {
    const { completed, title } = filters;

    const todos = await this.prisma.todo.findMany({
      where: {
        ...(completed !== undefined && { completed }),
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
      },
    });

    return todos.map((todo) => TodoFactory.fromPersistence(todo));
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

    return TodoFactory.fromPersistence(createdTodo);
  }

  async update(todo: TodoEntity): Promise<TodoEntity> {
    const data = await this.prisma.todo.update({
      where: { id: todo.getId() },
      data: {
        title: todo.getTitle().getValue(),
        completed: todo.getCompleted(),
      },
    });

    return TodoFactory.fromPersistence(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { id },
    });
  }
}
