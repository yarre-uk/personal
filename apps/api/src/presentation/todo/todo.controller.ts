import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ITodoService,
  TODO_SERVICE_KEY,
  TodoCreateDTO,
  TodoFiltersDTO,
  TodoResponseDTO,
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
  @ApiResponse({ status: 200, type: [TodoResponseDTO] })
  findAll(): Promise<TodoResponseDTO[]> {
    return this.todoService.findAll();
  }

  @Get('by-id/:id')
  @ApiOperation({ summary: 'Get todo by ID' })
  @ApiResponse({ status: 200, type: TodoResponseDTO })
  async findById(@Param('id') id: string) {
    return this.todoService.findById(id);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get todos by filters' })
  @ApiResponse({ status: 200, type: [TodoResponseDTO] })
  async findByFilters(@Query() filters: TodoFiltersDTO) {
    return this.todoService.findByFilters(filters);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, type: TodoResponseDTO })
  async create(@Body() todo: TodoCreateDTO) {
    return this.todoService.create(todo);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update an existing todo' })
  @ApiResponse({ status: 200, type: TodoResponseDTO })
  async update(@Body() todo: TodoUpdateDTO) {
    return this.todoService.update(todo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
