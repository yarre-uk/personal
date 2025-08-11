import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  findAll(): Promise<TodoResponseDTO[]> {
    return this.todoService.findAll();
  }

  @Get('by-id/:id')
  @ApiOperation({ summary: 'Get todo by ID' })
  async findById(@Param('id') id: number) {
    return this.todoService.findById(id);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get todos by filters' })
  async findByFilters(@Query() filters: TodoFiltersDTO) {
    return this.todoService.findByFilters(filters);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new todo' })
  async create(@Body() todo: TodoCreateDTO) {
    return this.todoService.create(todo);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update an existing todo' })
  async update(@Body() todo: TodoUpdateDTO) {
    return this.todoService.update(todo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  async delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
