import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { ITodoFilters } from './todo.repository';

import { TodoEntity } from '~/domain';

export class TodoCreateDTO {
  @ApiProperty({ example: 'New Todo' })
  @IsString()
  title: string;
}

export class TodoUpdateDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Updated Title' })
  @IsString()
  @IsOptional()
  title?: string;
}

export class TodoResponseDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Base Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Base Description' })
  @IsString()
  completed: boolean;
}

export class TodoFiltersDTO implements ITodoFilters {
  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({ required: false, example: 'Sample Title' })
  @IsString()
  @IsOptional()
  title?: string;
}

export function toTodoResponseDTO(todoEntity: TodoEntity): TodoResponseDTO {
  const todoResponseDTO = new TodoResponseDTO();

  todoResponseDTO.id = todoEntity.id;
  todoResponseDTO.title = todoEntity.title;
  todoResponseDTO.completed = todoEntity.completed;

  return todoResponseDTO;
}
