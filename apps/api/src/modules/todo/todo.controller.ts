import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ITodoService,
  TODO_SERVICE_KEY,
  TodoCreateDTO,
  TodoFiltersDTO,
  TodoUpdateDTO,
} from '../../application/interfaces';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE_KEY) private readonly todoService: ITodoService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by ID' })
  async findById(id: number) {
    return this.todoService.findById(id);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get todos by filters' })
  async findByFilters(filters: TodoFiltersDTO) {
    return this.todoService.findByFilters(filters);
  }

  @Get('create')
  @ApiOperation({ summary: 'Create a new todo' })
  async create(todo: TodoCreateDTO) {
    return this.todoService.create(todo);
  }

  @Get('update')
  @ApiOperation({ summary: 'Update an existing todo' })
  async update(todo: TodoUpdateDTO) {
    return this.todoService.update(todo);
  }

  @Get('delete/:id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  async delete(id: number) {
    return this.todoService.delete(id);
  }
}
